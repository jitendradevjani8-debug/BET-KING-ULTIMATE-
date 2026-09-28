"use strict";

const { listPredictions } = require("../prediction-engine/registry");
const {
  analyzePerformance
} = require("../analytics/performance");

function buildOwnerControlCenter() {
  const predictions = listPredictions();

  const total = predictions.length;

  const highConfidence = predictions.filter(
    (item) => item.mode === "HIGH_CONFIDENCE"
  );

  const ultraVip = predictions.filter(
    (item) => item.mode === "ULTRA_VIP_MIX"
  );

  const pending = predictions.filter(
    (item) => item.status === "PENDING"
  );

  const won = predictions.filter(
    (item) => item.result === "WON"
  );

  const lost = predictions.filter(
    (item) => item.result === "LOST"
  );

  /*
   * Performance V1
   *
   * Le Control Center utilise ici les donnees
   * deja presentes dans le Registry.
   */
  const performanceResults = predictions.map((item) => ({
    id: item.id,
    match: item.match,
    mode: item.mode,
    filterApproved: true,
    actualResult: item.result,
    prediction:
      item.result === "WON" || item.result === "LOST"
        ? item.result
        : "PENDING",
    odds: item.odds || null,
    market: item.market || "UNKNOWN"
  }));

  const performance = analyzePerformance(
    performanceResults
  );

  return {
    owner: "OWNER",
    generatedAt: new Date().toISOString(),

    overview: {
      totalPredictions: total,
      highConfidence: highConfidence.length,
      ultraVipMix: ultraVip.length,
      pending: pending.length,
      won: won.length,
      lost: lost.length
    },

    performance,

    predictions
  };
}

module.exports = {
  buildOwnerControlCenter
};
