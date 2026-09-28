"use strict";

const { historicalMatches } = require("./src/backtest/dataset");
const { runBacktest } = require("./src/backtest/simulation");
const { simulateBankroll } = require("./src/analytics/bankroll");

console.log("=== BET KING ULTIMATE ===");
console.log("TEST BACKTEST → BANKROLL V1");

const results = runBacktest(historicalMatches);

const bankroll = simulateBankroll(
  results,
  1000,
  1
);

console.log("\n--- RESULTATS BACKTEST ---");
console.log(JSON.stringify(results, null, 2));

console.log("\n--- BANKROLL ---");
console.log(JSON.stringify(bankroll, null, 2));

console.log("\nTEST TERMINE");
