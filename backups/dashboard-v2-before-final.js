"use strict";

function buildOwnerDashboard(controlCenter) {
  if (
    !controlCenter ||
    typeof controlCenter !== "object"
  ) {
    throw new Error("Control Center invalide.");
  }

  const overview = controlCenter.overview || {};
  const performance = controlCenter.performance || {};
  const bankroll = controlCenter.bankroll || {};
  const history = controlCenter.history || {};

  return {
    owner: controlCenter.owner || "OWNER",
    generatedAt:
      controlCenter.generatedAt ||
      new Date().toISOString(),

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
      selected:
        performance.selected || 0,

      won:
        performance.won || 0,

      lost:
        performance.lost || 0,

      hitRate:
        performance.hitRate,

      theoreticalReturn:
        performance.theoreticalReturn || 0
    },

    bankroll: {
      initial:
        bankroll.initialBankroll || 0,

      current:
        bankroll.finalBankroll || 0,

      netProfit:
        bankroll.netProfit || 0,

      returnPercentage:
        bankroll.returnPercentage || 0,

      totalStaked:
        bankroll.totalStaked || 0
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

module.exports = {
  buildOwnerDashboard
};
