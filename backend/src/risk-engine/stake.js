"use strict";

function calculateStake(input) {
  const {
    bankroll,
    level,
    maxStakePercent = 2
  } = input;

  if (
    typeof bankroll !== "number" ||
    bankroll <= 0
  ) {
    throw new Error("Bankroll invalide.");
  }

  const riskProfiles = {
    LOW: 0.005,
    MODERATE: 0.01,
    HIGH: 0.015
  };

  const profilePercent = riskProfiles[level];

  if (!profilePercent) {
    throw new Error("Niveau de risque inconnu.");
  }

  const effectivePercent = Math.min(
    profilePercent,
    maxStakePercent / 100
  );

  const theoreticalStake =
    bankroll * effectivePercent;

  return {
    bankroll,
    riskLevel: level,
    stakePercent: Number(
      (effectivePercent * 100).toFixed(2)
    ),
    theoreticalStake: Number(
      theoreticalStake.toFixed(2)
    ),
    maxStakePercent,
    warning:
      "Mise theorique de gestion du risque. Aucun gain n'est garanti."
  };
}

module.exports = {
  calculateStake
};
