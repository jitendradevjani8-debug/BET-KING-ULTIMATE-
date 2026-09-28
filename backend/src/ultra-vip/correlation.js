"use strict";

const CORRELATED_GROUPS = [
  ["over15", "over25"],
  ["over25", "under25"],
  ["btts", "over15"],
  ["btts", "over25"]
];

function checkCorrelation(selections) {
  if (!Array.isArray(selections)) {
    throw new Error("Selections invalides.");
  }

  const warnings = [];
  const blockedPairs = [];

  for (let i = 0; i < selections.length; i++) {
    for (let j = i + 1; j < selections.length; j++) {
      const a = selections[i].market;
      const b = selections[j].market;

      const related = CORRELATED_GROUPS.some(
        ([x, y]) =>
          (a === x && b === y) ||
          (a === y && b === x)
      );

      if (related) {
        blockedPairs.push([a, b]);
      }
    }
  }

  if (blockedPairs.length > 0) {
    warnings.push(
      "Certaines selections appartiennent a des marches fortement lies."
    );
  }

  return {
    approved: blockedPairs.length === 0,
    blockedPairs,
    warnings
  };
}

module.exports = {
  checkCorrelation
};
