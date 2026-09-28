"use strict";

const {
  runUltraVip
} = require("./src/ultra-vip/pipeline");

console.log("=== BET KING ULTIMATE ===");
console.log("TEST PIPELINE ULTRA VIP");

const result = runUltraVip({
  match: "MATCH ULTRA PIPELINE - Equipes fictives",

  selections: [
    {
      market: "homeWin",
      odds: 1.55,
      probability: 0.72
    },
    {
      market: "over15",
      odds: 1.30,
      probability: 0.78
    },
    {
      market: "btts",
      odds: 1.70,
      probability: 0.58
    }
  ]
});

console.log(JSON.stringify(result, null, 2));

console.log("\n=== VERIFICATION ===");

if (
  result.filter.approved &&
  result.correlation.approved &&
  result.saved
) {
  console.log("✅ PIPELINE ULTRA VIP REUSSI");
  console.log("ID :", result.predictionId);
} else {
  console.log("❌ PIPELINE ULTRA VIP REJETE");
}

console.log("TEST TERMINE");
