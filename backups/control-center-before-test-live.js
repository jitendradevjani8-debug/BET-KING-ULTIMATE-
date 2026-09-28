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
const {
  buildOwnerDashboard
} = require("./dashboard");

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

  const getResultStatus = (item) => {
    if (typeof item.result === "string") {
      return item.result;
    }

    if (
      item.result &&
      typeof item.result === "object" &&
      typeof item.result.status === "string"
    ) {
      return item.result.status;
    }

    return null;
  };

  const won = predictions.filter(
    (item) => getResultStatus(item) === "WON"
  );

  const lost = predictions.filter(
    (item) => getResultStatus(item) === "LOST"
  );

  const performanceResults = predictions.map(
    (item) => ({
      id: item.id,
      match: item.match,
      mode: item.mode,
      filterApproved: true,
      actualResult: getResultStatus(item),
      prediction:
        getResultStatus(item) === "WON" ||
        getResultStatus(item) === "LOST"
          ? getResultStatus(item)
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

  const dashboard = buildOwnerDashboard({
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
    history
  });

  return {
    owner: "OWNER",
    generatedAt: dashboard.generatedAt,
    dashboard: dashboard,

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
