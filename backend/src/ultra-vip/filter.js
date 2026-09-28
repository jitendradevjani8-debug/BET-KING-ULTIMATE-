"use strict";

function evaluateUltraVipMix(input) {
  const {
    combinedOdds,
    naiveCombinedProbability,
    valuePoints,
    selections,
    minProbability = 0.20,
    minValuePoints = 2,
    minOdds = 2,
    maxOdds = 6,
    maxSelections = 4
  } = input;

  if (
    typeof combinedOdds !== "number" ||
    typeof naiveCombinedProbability !== "number" ||
    typeof valuePoints !== "number" ||
    !Array.isArray(selections)
  ) {
    return {
      approved: false,
      level: "INVALID",
      reason: "Donnees du mix invalides."
    };
  }

  const reasons = [];

  if (selections.length < 2) {
    reasons.push("Au moins 2 selections.");
  }

  if (selections.length > maxSelections) {
    reasons.push(`Maximum ${maxSelections} selections.`);
  }

  if (combinedOdds < minOdds) {
    reasons.push("Cote combinee trop faible.");
  }

  if (combinedOdds > maxOdds) {
    reasons.push("Cote combinee trop elevee.");
  }

  if (naiveCombinedProbability < minProbability) {
    reasons.push("Probabilite combinee trop faible.");
  }

  if (valuePoints < minValuePoints) {
    reasons.push("Valeur insuffisante.");
  }

  const approved = reasons.length === 0;

  let level = "REJECTED";

  if (approved) {
    if (
      naiveCombinedProbability >= 0.35 &&
      valuePoints >= 5
    ) {
      level = "VIP_HIGH";
    } else {
      level = "VIP_STANDARD";
    }
  }

  return {
    approved,
    level,
    combinedOdds,
    naiveCombinedProbability,
    valuePoints,
    selectionCount: selections.length,
    thresholds: {
      minProbability,
      minValuePoints,
      minOdds,
      maxOdds,
      maxSelections
    },
    reasons,
    warning:
      "Evaluation experimentale. Les marches d'un meme match peuvent etre correles. Aucune garantie de resultat."
  };
}

module.exports = {
  evaluateUltraVipMix
};
