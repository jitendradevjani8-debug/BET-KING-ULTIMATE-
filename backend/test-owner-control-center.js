"use strict";

const {
  buildOwnerControlCenter
} = require("./src/owner/control-center");

console.log("=== BET KING ULTIMATE ===");
console.log("TEST OWNER CONTROL CENTER V4");

const controlCenter = buildOwnerControlCenter();

console.log("\n--- OVERVIEW ---");
console.log(
  JSON.stringify(
    controlCenter.overview,
    null,
    2
  )
);

console.log("\n--- PERFORMANCE ---");
console.log(
  JSON.stringify(
    controlCenter.performance,
    null,
    2
  )
);

console.log("\n--- BANKROLL ---");
console.log(
  JSON.stringify(
    controlCenter.bankroll,
    null,
    2
  )
);

console.log("\n--- HISTORY : ALL ---");
console.log(
  JSON.stringify(
    controlCenter.history,
    null,
    2
  )
);

console.log("\n--- HISTORY : HIGH_CONFIDENCE ---");

const highConfidence = buildOwnerControlCenter(
  1000,
  1,
  {
    mode: "HIGH_CONFIDENCE"
  }
);

console.log(
  JSON.stringify(
    highConfidence.history,
    null,
    2
  )
);

console.log("\n--- HISTORY : GLOBAL ---");

const globalHistory = buildOwnerControlCenter(
  1000,
  1,
  {
    search: "GLOBAL"
  }
);

console.log(
  JSON.stringify(
    globalHistory.history,
    null,
    2
  )
);

console.log("\nTEST TERMINE");
