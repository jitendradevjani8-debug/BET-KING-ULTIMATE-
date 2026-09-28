"use strict";

const { historicalMatches } = require("./src/backtest/dataset");
const { runBacktest } = require("./src/backtest/simulation");
const { calculateMetrics } = require("./src/backtest/metrics");

console.log("=== BET KING ULTIMATE ===");
console.log("TEST BACKTEST METRICS V1");

const results = runBacktest(historicalMatches);
const metrics = calculateMetrics(results);

console.log(JSON.stringify(metrics, null, 2));

console.log("\nTEST TERMINE");
