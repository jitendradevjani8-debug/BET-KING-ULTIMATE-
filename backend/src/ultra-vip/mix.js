"use strict";

function buildUltraVipMix(input) {
  const {
    match,
    selections,
    maxSelections = 4
  } = input;

  if (!match) {
    throw new Error("Match obligatoire.");
  }

  if (!Array.isArray(selections) || selections.length < 2) {
    throw new Error("Au moins 2 selections sont necessaires.");
  }

  if (selections.length > maxSelections) {
    throw new Error(`Maximum ${maxSelections} selections.`);
  }

  for (const selection of selections) {
    if (
      !selection.market ||
      typeof selection.odds !== "number" ||
      selection.odds <= 1 ||
      typeof selection.probability !== "number" ||
      selection.probability <= 0 ||
      selection.probability > 1
    ) {
      throw new Error("Selection invalide.");
    }
  }

  const combinedOdds = selections.reduce(
    (total, selection) => total * selection.odds,
    1
  );

  const naiveCombinedProbability = selections.reduce(
    (total, selection) => total * selection.probability,
    1
  );

  const impliedCombinedProbability = 1 / combinedOdds;

  const valuePoints =
    (naiveCombinedProbability - impliedCombinedProbability) * 100;

  return {
    mode: "ULTRA_VIP_MIX",
    match,
    selections,
    combinedOdds: Number(combinedOdds.toFixed(2)),
    naiveCombinedProbability: Number(
      naiveCombinedProbability.toFixed(4)
    ),
    impliedCombinedProbability: Number(
      impliedCombinedProbability.toFixed(4)
    ),
    valuePoints: Number(valuePoints.toFixed(2)),
    warning:
      "Mix experimental. Les probabilites combinees supposent une approximation d'independance et ne constituent pas une garantie."
  };
}

module.exports = {
  buildUltraVipMix
};
