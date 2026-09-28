"use strict";

const { listPredictions } = require("../prediction-engine/registry");
const {
  analyzePerformance
} = require("../analytics/performance");
const {
  simulateBankroll
} = require("../analytics/bankroll");
const {
  filterOwnerHistory
} = require("./history");

function buildOwnerControlCenter(
  initialBankroll = 1000,
  stakePercent = 1,
  historyFilters = {}
) {
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

  const performanceResults = predictions.map(
    (item) => ({
      id: item.id,
      match: item.match,
      mode: item.mode,
      filterApproved: true,
      actualResult: item.result,
      prediction:
        item.result === "WON" ||
        item.result === "LOST"
          ? item.result
          : "PENDING",
      odds: item.odds || null,
      market: item.market || "UNKNOWN"
    })
  );

  const performance = analyzePerformance(
    performanceResults
  );

  const bankroll = simulateBankroll(
    performanceResults,
    initialBankroll,
    stakePercent
  );

  const history = filterOwnerHistory(
    predictions,
    historyFilters
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

    bankroll,

    history,

    predictions
  };
}

module.exports = {
  buildOwnerControlCenter
};
