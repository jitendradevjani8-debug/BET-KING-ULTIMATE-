"use strict";

const {
  calculateStake
} = require("./src/risk-engine/stake");

console.log("=== BET KING ULTIMATE ===");
console.log("TEST RISK ENGINE V1");

const tests = [
  {
    bankroll: 1000,
    level: "LOW"
  },
  {
    bankroll: 1000,
    level: "MODERATE"
  },
  {
    bankroll: 1000,
    level: "HIGH"
  }
];

for (const test of tests) {
  console.log("\nTEST :", test.level);

  const result = calculateStake(test);

  console.log(
    JSON.stringify(result, null, 2)
  );
}

console.log("\nTEST TERMINE");
