"use strict";

const {
  listPredictions
} = require("./src/prediction-engine/registry");

const {
  filterOwnerHistory
} = require("./src/owner/history");

console.log("=== BET KING ULTIMATE ===");
console.log("TEST OWNER HISTORY V1");

const predictions = listPredictions();

console.log("\n--- TOTAL ---");
console.log(predictions.length);

console.log("\n--- HIGH CONFIDENCE ---");
console.log(
  JSON.stringify(
    filterOwnerHistory(
      predictions,
      {
        mode: "HIGH_CONFIDENCE"
      }
    ),
    null,
    2
  )
);

console.log("\n--- ULTRA VIP MIX ---");
console.log(
  JSON.stringify(
    filterOwnerHistory(
      predictions,
      {
        mode: "ULTRA_VIP_MIX"
      }
    ),
    null,
    2
  )
);

console.log("\n--- PENDING ---");
console.log(
  JSON.stringify(
    filterOwnerHistory(
      predictions,
      {
        status: "PENDING"
      }
    ),
    null,
    2
  )
);

console.log("\n--- RECHERCHE ---");
console.log(
  JSON.stringify(
    filterOwnerHistory(
      predictions,
      {
        search: "GLOBAL"
      }
    ),
    null,
    2
  )
);

console.log("\nTEST TERMINE");
