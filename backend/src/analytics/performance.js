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

function analyzeByMarket(results) {
  if (!Array.isArray(results)) {
    throw new Error("Resultats invalides.");
  }

  const markets = {};

  for (const item of results) {
    const market = item.market || "UNKNOWN";

    if (!markets[market]) {
      markets[market] = {
        market,
        totalAnalyzed: 0,
        selected: 0,
        won: 0,
        lost: 0,
        notSelected: 0,
        hitRate: null,
        theoreticalReturn: 0
      };
    }

    markets[market].totalAnalyzed += 1;

    if (item.filterApproved === true) {
      markets[market].selected += 1;
    }

    if (
      item.actualResult === "WON" &&
      item.filterApproved === true
    ) {
      markets[market].won += 1;
      markets[market].theoreticalReturn += item.odds - 1;
    }

    if (
      item.actualResult === "LOST" &&
      item.filterApproved === true
    ) {
      markets[market].lost += 1;
      markets[market].theoreticalReturn -= 1;
    }

    if (item.prediction === "NOT_SELECTED") {
      markets[market].notSelected += 1;
    }
  }

  for (const market of Object.values(markets)) {
    const settled = market.won + market.lost;

    if (settled > 0) {
      market.hitRate = Number(
        ((market.won / settled) * 100).toFixed(2)
      );
    }

    market.theoreticalReturn = Number(
      market.theoreticalReturn.toFixed(4)
    );
  }

  return markets;
}

function analyzeByMode(results) {
  if (!Array.isArray(results)) {
    throw new Error("Resultats invalides.");
  }

  const modes = {};

  for (const item of results) {
    const mode = item.mode || "UNKNOWN";

    if (!modes[mode]) {
      modes[mode] = {
        mode,
        totalAnalyzed: 0,
        selected: 0,
        won: 0,
        lost: 0,
        notSelected: 0,
        hitRate: null,
        theoreticalReturn: 0
      };
    }

    modes[mode].totalAnalyzed += 1;

    if (item.filterApproved === true) {
      modes[mode].selected += 1;
    }

    if (
      item.actualResult === "WON" &&
      item.filterApproved === true
    ) {
      modes[mode].won += 1;
      modes[mode].theoreticalReturn += item.odds - 1;
    }

    if (
      item.actualResult === "LOST" &&
      item.filterApproved === true
    ) {
      modes[mode].lost += 1;
      modes[mode].theoreticalReturn -= 1;
    }

    if (item.prediction === "NOT_SELECTED") {
      modes[mode].notSelected += 1;
    }
  }

  for (const mode of Object.values(modes)) {
    const settled = mode.won + mode.lost;

    if (settled > 0) {
      mode.hitRate = Number(
        ((mode.won / settled) * 100).toFixed(2)
      );
    }

    mode.theoreticalReturn = Number(
      mode.theoreticalReturn.toFixed(4)
    );
  }

  return modes;
}

module.exports = {
  analyzePerformance,
  analyzeByMarket,
  analyzeByMode
};
