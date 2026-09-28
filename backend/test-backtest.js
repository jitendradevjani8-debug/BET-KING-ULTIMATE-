"use strict";

const { historicalMatches } = require("./src/backtest/dataset");
const { runBacktest } = require("./src/backtest/simulation");

console.log("=== BET KING ULTIMATE ===");
console.log("TEST BACKTESTING V1");

const results = runBacktest(historicalMatches);

console.log(JSON.stringify(results, null, 2));

console.log("\nTEST TERMINE");
