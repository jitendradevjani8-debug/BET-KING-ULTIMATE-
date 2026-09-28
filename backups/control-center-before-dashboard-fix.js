"use strict";

const {
  listPredictions
} = require("../prediction-engine/registry");

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

function getResultStatus(item) {
  if (
    typeof item.result === "string"
  ) {
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
}

function normalizeEnvironment(item) {
  return item.environment === "LIVE"
    ? "LIVE"
    : "TEST";
}

function buildEnvironmentData(
  predictions,
  environment,
  initialBankroll,
  stakePercent
) {
  const environmentPredictions =
    predictions.filter(
      item =>
        normalizeEnvironment(item) ===
        environment
    );

  const total =
    environmentPredictions.length;

  const highConfidence =
    environmentPredictions.filter(
      item =>
        item.mode === "HIGH_CONFIDENCE"
    );

  const ultraVip =
    environmentPredictions.filter(
      item =>
        item.mode === "ULTRA_VIP_MIX"
    );

  const pending =
    environmentPredictions.filter(
      item =>
        item.status === "PENDING"
    );

  const won =
    environmentPredictions.filter(
      item =>
        getResultStatus(item) === "WON"
    );

  const lost =
    environmentPredictions.filter(
      item =>
        getResultStatus(item) === "LOST"
    );

  const performanceResults =
    environmentPredictions.map(
      item => ({
        id: item.id,
        match: item.match,
        mode: item.mode,

        filterApproved:
          item.filterApproved === true,

        actualResult:
          getResultStatus(item),

        prediction:
          getResultStatus(item) === "WON" ||
          getResultStatus(item) === "LOST"
            ? getResultStatus(item)
            : "PENDING",

        odds:
          typeof item.odds === "number"
            ? item.odds
            : null,

        market:
          item.market || "UNKNOWN"
      })
    );

  const performance =
    analyzePerformance(
      performanceResults
    );

  const bankroll =
    simulateBankroll(
      performanceResults,
      initialBankroll,
      stakePercent
    );

  return {
    environment,

    overview: {
      totalPredictions: total,
      highConfidence:
        highConfidence.length,
      ultraVipMix:
        ultraVip.length,
      pending:
        pending.length,
      won:
        won.length,
      lost:
        lost.length
    },

    performance,

    bankroll,

    history: {
      total: total,
      predictions:
        environmentPredictions
    }
  };
}

function buildOwnerControlCenter(
  initialBankroll = 1000,
  stakePercent = 1,
  historyFilters = {}
) {
  const predictions =
    listPredictions();

  const test =
    buildEnvironmentData(
      predictions,
      "TEST",
      initialBankroll,
      stakePercent
    );

  const live =
    buildEnvironmentData(
      predictions,
      "LIVE",
      initialBankroll,
      stakePercent
    );

  const history =
    filterOwnerHistory(
      predictions,
      historyFilters
    );

  const total =
    predictions.length;

  const dashboard =
    buildOwnerDashboard({
      owner: "OWNER",

      generatedAt:
        new Date().toISOString(),

      overview: {
        totalPredictions: total,

        highConfidence:
          predictions.filter(
            item =>
              item.mode ===
              "HIGH_CONFIDENCE"
          ).length,

        ultraVipMix:
          predictions.filter(
            item =>
              item.mode ===
              "ULTRA_VIP_MIX"
          ).length,

        pending:
          predictions.filter(
            item =>
              item.status ===
              "PENDING"
          ).length,

        won:
          predictions.filter(
            item =>
              getResultStatus(item) ===
              "WON"
          ).length,

        lost:
          predictions.filter(
            item =>
              getResultStatus(item) ===
              "LOST"
          ).length
      },

      performance:
        test.performance,

      bankroll:
        test.bankroll,

      history
    });

  return {
    owner: "OWNER",

    generatedAt:
      dashboard.generatedAt,

    dashboard,

    overview: {
      totalPredictions: total,

      highConfidence:
        predictions.filter(
          item =>
            item.mode ===
            "HIGH_CONFIDENCE"
        ).length,

      ultraVipMix:
        predictions.filter(
          item =>
            item.mode ===
            "ULTRA_VIP_MIX"
        ).length,

      pending:
        predictions.filter(
          item =>
            item.status ===
            "PENDING"
        ).length,

      won:
        predictions.filter(
          item =>
            getResultStatus(item) ===
            "WON"
        ).length,

      lost:
        predictions.filter(
          item =>
            getResultStatus(item) ===
            "LOST"
        ).length
    },

    environments: {
      TEST: test,
      LIVE: live
    },

    performance:
      test.performance,

    bankroll:
      test.bankroll,

    history,

    predictions
  };
}

module.exports = {
  buildOwnerControlCenter
};
