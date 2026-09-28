"use strict";

function analyzePerformance(results) {
  if (!Array.isArray(results)) {
    throw new Error("Resultats invalides.");
  }

  const selected = results.filter(
    (item) => item.filterApproved === true
  );

  const won = selected.filter(
    (item) => item.actualResult === "WON"
  );

  const lost = selected.filter(
    (item) => item.actualResult === "LOST"
  );

  const settled = won.length + lost.length;

  const hitRate =
    settled > 0
      ? Number(((won.length / settled) * 100).toFixed(2))
      : null;

  let theoreticalReturn = 0;

  for (const item of won) {
    theoreticalReturn += item.odds - 1;
  }

  for (const item of lost) {
    theoreticalReturn -= 1;
  }

  return {
    totalAnalyzed: results.length,
    selected: selected.length,
    won: won.length,
    lost: lost.length,
    pendingOrUnsettled: selected.filter(
      (item) =>
        item.actualResult !== "WON" &&
        item.actualResult !== "LOST"
    ).length,
    notSelected: results.filter(
      (item) => item.prediction === "NOT_SELECTED"
    ).length,
    hitRate,
    theoreticalReturn: Number(
      theoreticalReturn.toFixed(4)
    ),
    warning:
      "Analyse experimentale basee sur les donnees fournies. Elle ne constitue pas une preuve de rentabilite future."
  };
}

module.exports = {
  analyzePerformance
};
