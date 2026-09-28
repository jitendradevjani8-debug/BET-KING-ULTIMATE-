"use strict";

const { estimateMatch } = require("./src/prediction-engine/probability");
const { evaluateHighConfidence } = require("./src/high-confidence/filter");
const { savePrediction } = require("./src/prediction-engine/registry");

console.log("=== BET KING ULTIMATE ===");
console.log("HIGH CONFIDENCE → REGISTRE OWNER");

const match = {
  name: "MATCH TEST HC - Equipes fictives",
  homeExpectedGoals: 1.8,
  awayExpectedGoals: 0.7
};

const analysis = estimateMatch(
  match.homeExpectedGoals,
  match.awayExpectedGoals
);

const selection = evaluateHighConfidence({
  probability: analysis.probabilities.over15,
  odds: 1.30
});

console.log("\nANALYSE :");
console.log(JSON.stringify(analysis, null, 2));

console.log("\nFILTRE :");
console.log(JSON.stringify(selection, null, 2));

if (selection.approved) {
  const saved = savePrediction({
    mode: "HIGH_CONFIDENCE",
    match: match.name,
    homeExpectedGoals: match.homeExpectedGoals,
    awayExpectedGoals: match.awayExpectedGoals,
    probabilities: analysis.probabilities
  });

  console.log("\n✅ PREDICTION ENREGISTREE");
  console.log("ID :", saved.id);
  console.log("Mode :", saved.mode);
  console.log("Statut :", saved.status);
} else {
  console.log("\n❌ PREDICTION REJETEE PAR LE FILTRE");
}

console.log("\nTEST TERMINE");
