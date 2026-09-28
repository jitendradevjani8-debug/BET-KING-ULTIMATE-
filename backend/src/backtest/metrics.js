"use strict";

function calculateMetrics(results) {
  if (!Array.isArray(results)) {
    throw new Error("Resultats de backtest invalides.");
  }

  const total = results.length;

  const selected = results.filter(
    (item) => item.filterApproved === true
  );

  const won = selected.filter(
    (item) => item.actualResult === "WON"
  );

  const lost = selected.filter(
    (item) => item.actualResult === "LOST"
  );

  const notSelected = results.filter(
    (item) => item.prediction === "NOT_SELECTED"
  );

  const settled = won.length + lost.length;

  let hitRate = null;

  if (settled > 0) {
    hitRate = Number(
      ((won.length / settled) * 100).toFixed(2)
    );
  }

  let theoreticalReturn = 0;

  for (const item of won) {
    theoreticalReturn += item.odds - 1;
  }

  for (const item of lost) {
    theoreticalReturn -= 1;
  }

  return {
    total,
    selected: selected.length,
    won: won.length,
    lost: lost.length,
    notSelected: notSelected.length,
    hitRate,
    theoreticalReturn: Number(
      theoreticalReturn.toFixed(4)
    ),
    warning:
      "Metriques experimentales basees sur un dataset fictif."
  };
}

module.exports = {
  calculateMetrics
};
