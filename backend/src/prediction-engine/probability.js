"use strict";

// BET KING ULTIMATE
// Moteur statistique V1
// Les probabilites sont des estimations, pas des garanties.

function validateNumber(value, name) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(name + " doit etre un nombre valide.");
  }
}

function impliedProbability(odds) {
  validateNumber(odds, "La cote");

  if (odds <= 1) {
    throw new Error("La cote doit etre superieure a 1.");
  }

  return 1 / odds;
}

function poissonProbability(goals, lambda) {
  validateNumber(lambda, "La moyenne de buts");

  if (!Number.isInteger(goals) || goals < 0) {
    throw new Error("Le nombre de buts doit etre un entier positif.");
  }

  if (lambda < 0 || lambda > 15) {
    throw new Error("La moyenne de buts doit etre entre 0 et 15.");
  }

  if (lambda === 0) {
    return goals === 0 ? 1 : 0;
  }

  let factorial = 1;

  for (let i = 2; i <= goals; i++) {
    factorial *= i;
  }

  return Math.exp(-lambda) * Math.pow(lambda, goals) / factorial;
}

function goalDistribution(lambda, maxGoals = 12) {
  const probabilities = [];

  for (let goals = 0; goals <= maxGoals; goals++) {
    probabilities.push(poissonProbability(goals, lambda));
  }

  return probabilities;
}

function estimateMatch(homeExpectedGoals, awayExpectedGoals) {
  validateNumber(homeExpectedGoals, "Buts attendus domicile");
  validateNumber(awayExpectedGoals, "Buts attendus exterieur");

  if (
    homeExpectedGoals < 0 ||
    awayExpectedGoals < 0 ||
    homeExpectedGoals > 15 ||
    awayExpectedGoals > 15
  ) {
    throw new Error("Les moyennes de buts doivent etre entre 0 et 15.");
  }

  const home = goalDistribution(homeExpectedGoals);
  const away = goalDistribution(awayExpectedGoals);

  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;
  let over15 = 0;
  let over25 = 0;
  let btts = 0;

  for (let h = 0; h < home.length; h++) {
    for (let a = 0; a < away.length; a++) {
      const probability = home[h] * away[a];

      if (h > a) homeWin += probability;
      else if (h === a) draw += probability;
      else awayWin += probability;

      if (h + a >= 2) over15 += probability;
      if (h + a >= 3) over25 += probability;
      if (h > 0 && a > 0) btts += probability;
    }
  }

  return {
    model: "Poisson V1",
    homeExpectedGoals,
    awayExpectedGoals,
    probabilities: {
      homeWin: round(homeWin),
      draw: round(draw),
      awayWin: round(awayWin),
      over15: round(over15),
      over25: round(over25),
      btts: round(btts)
    },
    warning:
      "Estimations mathematiques basees sur les moyennes fournies. " +
      "Pas de garantie et pas encore validees sur des donnees historiques."
  };
}

function compareWithOdds(probability, odds) {
  validateNumber(probability, "La probabilite");
  validateNumber(odds, "La cote");

  if (probability < 0 || probability > 1) {
    throw new Error("La probabilite doit etre entre 0 et 1.");
  }

  const marketProbability = impliedProbability(odds);

  return {
    estimatedProbability: round(probability),
    impliedMarketProbability: round(marketProbability),
    differencePercentagePoints: round(
      (probability - marketProbability) * 100
    ),
    expectedValuePerUnit: round(probability * odds - 1),
    note:
      "La comparaison depend de la qualite du modele et des cotes. " +
      "Une difference positive ne garantit pas un avantage reel."
  };
}

function round(value) {
  return Number(value.toFixed(4));
}

module.exports = {
  impliedProbability,
  poissonProbability,
  estimateMatch,
  compareWithOdds
};
