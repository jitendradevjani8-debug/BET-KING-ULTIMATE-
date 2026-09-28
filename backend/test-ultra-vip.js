"use strict";

const {
  buildUltraVipMix
} = require("./src/ultra-vip/mix");

console.log("=== BET KING ULTIMATE ===");
console.log("TEST ULTRA VIP MIX V1");

const result = buildUltraVipMix({
  match: "MATCH ULTRA TEST - Equipes fictives",

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

console.log("\nTEST TERMINE");
