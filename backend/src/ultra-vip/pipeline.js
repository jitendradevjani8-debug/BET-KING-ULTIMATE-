"use strict";

const { buildUltraVipMix } = require("./mix");
const { evaluateUltraVipMix } = require("./filter");
const { checkCorrelation } = require("./correlation");
const { savePrediction } = require("../prediction-engine/registry");
const { evaluateRisk } = require("../risk-engine/risk");

function runUltraVip(input) {
  const {
    bankroll,
    riskLevel = "LOW",
    maxStakePercent = 2,
    environment = "TEST"
  } = input;

  const mix = buildUltraVipMix(input);

  const correlation = checkCorrelation(
    mix.selections
  );

  const filter = evaluateUltraVipMix(mix);

  let risk = null;

  if (typeof bankroll === "number") {
    risk = evaluateRisk({
      bankroll,
      riskLevel,
      maxStakePercent
    });
  }

  const result = {
    ...mix,
    correlation,
    filter,
    risk,
    saved: false,
    predictionId: null
  };

  if (filter.approved && correlation.approved) {
    const saved = savePrediction({
      mode: "ULTRA_VIP_MIX",
      environment,
      match: mix.match,
      homeExpectedGoals: null,
      awayExpectedGoals: null,
      probabilities: {
        combined: mix.naiveCombinedProbability
      },
      selections: mix.selections,
      combinedOdds: mix.combinedOdds,
      filterApproved: filter.approved,
      filterLevel: filter.level
    });

    result.saved = true;
    result.predictionId = saved.id;
  }

  return result;
}

module.exports = {
  runUltraVip
};
