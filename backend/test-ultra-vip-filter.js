"use strict";

const {
  buildUltraVipMix
} = require("./src/ultra-vip/mix");

const {
  evaluateUltraVipMix
} = require("./src/ultra-vip/filter");

console.log("=== BET KING ULTIMATE ===");
console.log("TEST ULTRA VIP FILTER");

const mix = buildUltraVipMix({
  match: "MATCH VIP TEST - Equipes fictives",

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

const filter = evaluateUltraVipMix(mix);

console.log("\nMIX :");
console.log(JSON.stringify(mix, null, 2));

console.log("\nFILTRE :");
console.log(JSON.stringify(filter, null, 2));

if (filter.approved) {
  console.log("\n✅ ULTRA VIP MIX APPROUVE");
} else {
  console.log("\n❌ ULTRA VIP MIX REJETE");
}

console.log("\nTEST TERMINE");
