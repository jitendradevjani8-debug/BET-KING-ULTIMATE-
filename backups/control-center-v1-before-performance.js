"use strict";

const { listPredictions } = require("../prediction-engine/registry");

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

    predictions
  };
}

module.exports = {
  buildOwnerControlCenter
};
