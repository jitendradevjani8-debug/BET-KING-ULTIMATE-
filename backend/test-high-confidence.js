"use strict";

const {
  evaluateHighConfidence
} = require("./src/high-confidence/filter");

console.log("=== BET KING ULTIMATE ===");
console.log("TEST HIGH CONFIDENCE FILTER");

const result = evaluateHighConfidence({
  probability: 0.78,
  odds: 1.40
});

console.log(JSON.stringify(result, null, 2));

if (result.approved) {
  console.log("SELECTION : APPROUVEE POUR ANALYSE");
} else {
  console.log("SELECTION : REJETEE");
}

console.log("TEST TERMINE");
