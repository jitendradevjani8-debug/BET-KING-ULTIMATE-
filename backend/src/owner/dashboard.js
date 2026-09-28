"use strict";

function buildEnvironmentDashboard(environmentData) {
  if (
    !environmentData ||
    typeof environmentData !== "object"
  ) {
    throw new Error(
      "Donnees environnement invalides."
    );
  }

  const overview =
    environmentData.overview || {};

  const performance =
    environmentData.performance || {};

  const bankroll =
    environmentData.bankroll || {};

  const history =
    environmentData.history || {};

  return {
    environment:
      environmentData.environment || "TEST",

    summary: {
      totalPredictions:
        overview.totalPredictions || 0,

      highConfidence:
        overview.highConfidence || 0,

      ultraVipMix:
        overview.ultraVipMix || 0,

      pending:
        overview.pending || 0,

      won:
        overview.won || 0,

      lost:
        overview.lost || 0
    },

    performance: {
      totalAnalyzed:
        performance.totalAnalyzed || 0,

      selected:
        performance.selected || 0,

      won:
        performance.won || 0,

      lost:
        performance.lost || 0,

      pendingOrUnsettled:
        performance.pendingOrUnsettled || 0,

      notSelected:
        performance.notSelected || 0,

      hitRate:
        performance.hitRate ?? null,

      theoreticalReturn:
        performance.theoreticalReturn || 0
    },

    bankroll: {
      initial:
        bankroll.initialBankroll || 0,

      current:
        bankroll.finalBankroll || 0,

      totalStaked:
        bankroll.totalStaked || 0,

      netProfit:
        bankroll.netProfit || 0,

      returnPercentage:
        bankroll.returnPercentage || 0,

      won:
        bankroll.won || 0,

      lost:
        bankroll.lost || 0,

      unsettled:
        bankroll.unsettled || 0
    },

    history: {
      total:
        history.total || 0
    },

    status: {
      predictions:
        (overview.totalPredictions || 0) > 0
          ? "ACTIVE"
          : "EMPTY",

      pending:
        (overview.pending || 0) > 0
          ? "PENDING"
          : "CLEAR"
    },

    warning:
      "Dashboard de suivi personnel. Les statistiques dépendent des données enregistrées et ne garantissent aucun résultat futur."
  };
}

function buildOwnerDashboard(controlCenter) {
  if (
    !controlCenter ||
    typeof controlCenter !== "object"
  ) {
    throw new Error(
      "Control Center invalide."
    );
  }

  const test =
    controlCenter.environments?.TEST || {
      environment: "TEST",
      overview: {},
      performance: {},
      bankroll: {},
      history: {}
    };

  const live =
    controlCenter.environments?.LIVE || {
      environment: "LIVE",
      overview: {},
      performance: {},
      bankroll: {},
      history: {}
    };

  return {
    owner:
      controlCenter.owner || "OWNER",

    generatedAt:
      controlCenter.generatedAt ||
      new Date().toISOString(),

    activeEnvironment:
      controlCenter.activeEnvironment ||
      "TEST",

    environments: {
      TEST:
        buildEnvironmentDashboard(test),

      LIVE:
        buildEnvironmentDashboard(live)
    },

    global: {
      totalPredictions:
        controlCenter.overview
          ?.totalPredictions || 0,

      highConfidence:
        controlCenter.overview
          ?.highConfidence || 0,

      ultraVipMix:
        controlCenter.overview
          ?.ultraVipMix || 0,

      pending:
        controlCenter.overview
          ?.pending || 0,

      won:
        controlCenter.overview
          ?.won || 0,

      lost:
        controlCenter.overview
          ?.lost || 0
    },

    security: {
      testDataSeparated: true,

      liveDataSeparated: true,

      ownerOnly: true,

      warning:
        "Les donnees TEST et LIVE sont separees. Les statistiques experimentales ne garantissent aucun resultat futur."
    },

    status: {
      test:
        (test.overview?.totalPredictions || 0) > 0
          ? "ACTIVE"
          : "EMPTY",

      live:
        (live.overview?.totalPredictions || 0) > 0
          ? "ACTIVE"
          : "EMPTY"
    },

    warning:
      "Dashboard de suivi personnel. Les statistiques dépendent des données enregistrées et ne garantissent aucun résultat futur."
  };
}

module.exports = {
  buildOwnerDashboard,
  buildEnvironmentDashboard
};
