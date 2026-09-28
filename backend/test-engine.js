"use strict";

const engine = require("./src/prediction-engine/probability");

const result = engine.estimateMatch(1.5, 1.0);

console.log("=== BET KING ULTIMATE ===");
console.log("Test HIGH CONFIDENCE V1");
console.log(JSON.stringify(result, null, 2));

console.log("\n=== TEST COTE ===");
console.log(engine.compareWithOdds(
  result.probabilities.over15,
  1.50
));

console.log("\n=== VERIFICATION ===");

if (
  result.probabilities.homeWin >= 0 &&
  result.probabilities.homeWin <= 1 &&
  result.probabilities.over15 >= 0 &&
  result.probabilities.over15 <= 1
) {
  console.log("TEST REUSSI");
} else {
  console.log("TEST ECHOUE");
  process.exitCode = 1;
}
