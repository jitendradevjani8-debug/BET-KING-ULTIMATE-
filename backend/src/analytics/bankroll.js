"use strict";

function simulateBankroll(results, initialBankroll = 1000, stakePercent = 1) {
  if (!Array.isArray(results)) {
    throw new Error("Resultats invalides.");
  }

  if (
    typeof initialBankroll !== "number" ||
    initialBankroll <= 0
  ) {
    throw new Error("Bankroll initiale invalide.");
  }

  if (
    typeof stakePercent !== "number" ||
    stakePercent <= 0 ||
    stakePercent > 100
  ) {
    throw new Error("Pourcentage de mise invalide.");
  }

  let bankroll = initialBankroll;
  let totalStaked = 0;
  let won = 0;
  let lost = 0;
  let unsettled = 0;

  const operations = [];

  for (const item of results) {
    if (item.filterApproved !== true) {
      continue;
    }

    if (
      typeof item.odds !== "number" ||
      item.odds <= 1
    ) {
      continue;
    }

    const stake = bankroll * (stakePercent / 100);

    if (item.actualResult === "WON") {
      const profit = stake * (item.odds - 1);

      bankroll += profit;
      totalStaked += stake;
      won += 1;

      operations.push({
        id: item.id,
        match: item.match,
        result: "WON",
        odds: item.odds,
        stake: Number(stake.toFixed(2)),
        profit: Number(profit.toFixed(2)),
        bankrollAfter: Number(bankroll.toFixed(2))
      });
    } else if (item.actualResult === "LOST") {
      const loss = stake;

      bankroll -= loss;
      totalStaked += stake;
      lost += 1;

      operations.push({
        id: item.id,
        match: item.match,
        result: "LOST",
        odds: item.odds,
        stake: Number(stake.toFixed(2)),
        profit: Number((-loss).toFixed(2)),
        bankrollAfter: Number(bankroll.toFixed(2))
      });
    } else {
      unsettled += 1;
    }
  }

  const netProfit = bankroll - initialBankroll;

  const returnPercentage =
    (netProfit / initialBankroll) * 100;

  return {
    initialBankroll: Number(initialBankroll.toFixed(2)),
    finalBankroll: Number(bankroll.toFixed(2)),
    totalStaked: Number(totalStaked.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
    returnPercentage: Number(returnPercentage.toFixed(2)),
    won,
    lost,
    unsettled,
    operations,
    warning:
      "Simulation theorique basee sur les donnees fournies. Elle ne constitue pas une preuve de rentabilite future."
  };
}

module.exports = {
  simulateBankroll
};
