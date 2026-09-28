"use strict";

const {
  runHighConfidence
} = require("./src/high-confidence/pipeline");

console.log("=== BET KING ULTIMATE ===");
console.log("TEST PIPELINE HIGH CONFIDENCE");

const result = runHighConfidence({
  match: "MATCH PIPELINE TEST - Equipes fictives",
  homeExpectedGoals: 2.4,
  awayExpectedGoals: 0.6,
  market: "homeWin",
  odds: 1.80
});

console.log(JSON.stringify(result, null, 2));

console.log("\n=== VERIFICATION ===");

if (result.filter.approved && result.saved) {
  console.log("✅ PIPELINE HC REUSSI");
  console.log("ID :", result.predictionId);
} else {
  console.log("❌ PIPELINE HC REJETE");
}

console.log("TEST TERMINE");
