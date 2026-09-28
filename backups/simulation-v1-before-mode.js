"use strict";

const { estimateMatch } = require("../prediction-engine/probability");
const { evaluateHighConfidence } = require("../high-confidence/filter");

function runBacktest(dataset) {
  if (!Array.isArray(dataset)) {
    throw new Error("Dataset invalide.");
  }

  const results = [];

  for (const item of dataset) {
    const analysis = estimateMatch(
      item.homeExpectedGoals,
      item.awayExpectedGoals
    );

    const probability = analysis.probabilities[item.market];

    if (typeof probability !== "number") {
      results.push({
        id: item.id,
        match: item.match,
        status: "SKIPPED",
        reason: `Marche inconnu : ${item.market}`
      });
      continue;
    }

    const filter = evaluateHighConfidence({
      probability,
      odds: item.odds
    });

    const prediction = filter.approved
      ? item.actualResult
      : "NOT_SELECTED";

    results.push({
      id: item.id,
      match: item.match,
      market: item.market,
      odds: item.odds,
      probability,
      filterApproved: filter.approved,
      filterLevel: filter.level,
      actualResult: item.actualResult,
      prediction
    });
  }

  return results;
}

module.exports = {
  runBacktest
};
