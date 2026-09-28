"use strict";

const { calculateStake } = require("./stake");

function evaluateRisk(input) {
  const {
    bankroll,
    riskLevel = "LOW",
    maxStakePercent = 2
  } = input;

  const stake = calculateStake({
    bankroll,
    level: riskLevel,
    maxStakePercent
  });

  return {
    approved: true,
    ...stake,
    warning:
      "Gestion du risque expérimentale. La mise calculée ne garantit aucun gain."
  };
}

module.exports = {
  evaluateRisk
};
