"use strict";

const { historicalMatches } = require("./src/backtest/dataset");
const { runBacktest } = require("./src/backtest/simulation");
const {
  analyzePerformance,
  analyzeByMarket,
  analyzeByMode
} = require("./src/analytics/performance");

console.log("=== BET KING ULTIMATE ===");
console.log("TEST PERFORMANCE LAB V1");

const results = runBacktest(historicalMatches);

const performance = analyzePerformance(results);
const byMarket = analyzeByMarket(results);
const byMode = analyzeByMode(results);

console.log("\n--- PERFORMANCE GLOBALE ---");
console.log(JSON.stringify(performance, null, 2));

console.log("\n--- PERFORMANCE PAR MARCHE ---");
console.log(JSON.stringify(byMarket, null, 2));

console.log("\n--- PERFORMANCE PAR MODE ---");
console.log(JSON.stringify(byMode, null, 2));

console.log("\nTEST TERMINE");
