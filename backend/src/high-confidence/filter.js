"use strict";

function evaluateHighConfidence(input) {
  const {
    probability,
    odds,
    minProbability = 0.70,
    minValuePoints = 3
  } = input;

  if (
    typeof probability !== "number" ||
    typeof odds !== "number" ||
    probability < 0 ||
    probability > 1 ||
    odds <= 1
  ) {
    return {
      approved: false,
      level: "INVALID",
      reason: "Donnees invalides."
    };
  }

  const impliedProbability = 1 / odds;
  const valuePoints = (probability - impliedProbability) * 100;

  const approved =
    probability >= minProbability &&
    valuePoints >= minValuePoints;

  let level = "LOW";

  if (approved && probability >= 0.80 && valuePoints >= 5) {
    level = "VERY_HIGH";
  } else if (approved) {
    level = "HIGH";
  }

  return {
    approved,
    level,
    probability,
    odds,
    impliedProbability: Number(impliedProbability.toFixed(4)),
    valuePoints: Number(valuePoints.toFixed(2)),
    thresholds: {
      minProbability,
      minValuePoints
    },
    warning:
      "Filtre statistique experimental. Aucune selection ne garantit un resultat."
  };
}

module.exports = {
  evaluateHighConfidence
};
