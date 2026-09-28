"use strict";

const { estimateMatch } = require("../prediction-engine/probability");
const { evaluateHighConfidence } = require("./filter");
const { savePrediction } = require("../prediction-engine/registry");
const { evaluateRisk } = require("../risk-engine/risk");

function runHighConfidence(input) {
  const {
    match,
    homeExpectedGoals,
    awayExpectedGoals,
    market = "over15",
    odds,
    bankroll,
    riskLevel = "LOW",
    maxStakePercent = 2
  } = input;

  if (!match || typeof odds !== "number") {
    throw new Error("Match et cote obligatoires.");
  }

  const analysis = estimateMatch(
    homeExpectedGoals,
    awayExpectedGoals
  );

  const probability = analysis.probabilities[market];

  if (typeof probability !== "number") {
    throw new Error(`Marche inconnu : ${market}`);
  }

  const filter = evaluateHighConfidence({
    probability,
    odds
  });

  let risk = null;

  if (typeof bankroll === "number") {
    risk = evaluateRisk({
      bankroll,
      riskLevel,
      maxStakePercent
    });
  }

  const result = {
    match,
    mode: "HIGH_CONFIDENCE",
    market,
    odds,
    analysis,
    filter,
    risk,
    saved: false,
    predictionId: null
  };

  if (filter.approved) {
    const saved = savePrediction({
      mode: "HIGH_CONFIDENCE",
      match,
      homeExpectedGoals,
      awayExpectedGoals,
      probabilities: analysis.probabilities
    });

    result.saved = true;
    result.predictionId = saved.id;
  }

  return result;
}

module.exports = {
  runHighConfidence
};
