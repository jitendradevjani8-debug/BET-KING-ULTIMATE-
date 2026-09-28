"use strict";

const engine = require("./src/prediction-engine/probability");
const registry = require("./src/prediction-engine/registry");

const analysis = engine.estimateMatch(1.5, 1.0);

const saved = registry.savePrediction({
  mode: "HIGH_CONFIDENCE",
  match: "MATCH TEST - Equipes fictives",
  homeExpectedGoals: 1.5,
  awayExpectedGoals: 1.0,
  probabilities: analysis.probabilities
});

console.log("ANALYSE ENREGISTREE");
console.log("ID :", saved.id);
console.log("Mode :", saved.mode);
console.log("Statut :", saved.status);

console.log("\nHISTORIQUE TOTAL :",
  registry.listPredictions().length);

console.log("\nTEST REUSSI");
