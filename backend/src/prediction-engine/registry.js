"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const FILE = path.join(
  __dirname,
  "../../data/predictions.json"
);

const ENVIRONMENTS = ["TEST", "LIVE"];

function readAll() {
  if (!fs.existsSync(FILE)) {
    return [];
  }

  const records = JSON.parse(
    fs.readFileSync(FILE, "utf8")
  );

  if (!Array.isArray(records)) {
    throw new Error("Registry invalide.");
  }

  return records;
}

function saveAll(records) {
  fs.mkdirSync(
    path.dirname(FILE),
    { recursive: true }
  );

  fs.writeFileSync(
    FILE,
    JSON.stringify(records, null, 2),
    "utf8"
  );
}

function normalizePrediction(record) {
  return {
    ...record,

    environment:
      ENVIRONMENTS.includes(record.environment)
        ? record.environment
        : "TEST"
  };
}

function savePrediction(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Analyse invalide.");
  }

  if (!data.match || !data.probabilities) {
    throw new Error(
      "Match ou probabilites manquants."
    );
  }

  const environment =
    data.environment || "TEST";

  if (!ENVIRONMENTS.includes(environment)) {
    throw new Error(
      "Environnement invalide. Utiliser TEST ou LIVE."
    );
  }

  const records = readAll();

  const record = {
    id: crypto.randomUUID(),

    createdAt:
      new Date().toISOString(),

    owner: "OWNER",

    environment,

    mode:
      data.mode || "HIGH_CONFIDENCE",

    match: data.match,

    expectedGoals: {
      home: data.homeExpectedGoals,
      away: data.awayExpectedGoals
    },

    probabilities:
      data.probabilities,

    market:
      data.market || null,

    odds:
      typeof data.odds === "number"
        ? data.odds
        : null,

    filterApproved:
      typeof data.filterApproved === "boolean"
        ? data.filterApproved
        : null,

    filterLevel:
      data.filterLevel || null,

    selections:
      Array.isArray(data.selections)
        ? data.selections
        : null,

    combinedOdds:
      typeof data.combinedOdds === "number"
        ? data.combinedOdds
        : null,

    status: "PENDING",

    result: null,

    note:
      "Analyse statistique non garantie."
  };

  records.push(record);

  saveAll(records);

  return record;
}

function listPredictions() {
  return readAll().map(
    normalizePrediction
  );
}

function updateResult(id, result) {
  const allowed = [
    "WON",
    "LOST",
    "VOID"
  ];

  if (!allowed.includes(result)) {
    throw new Error(
      "Resultat invalide."
    );
  }

  const records = readAll();

  const index = records.findIndex(
    item => item.id === id
  );

  if (index === -1) {
    throw new Error(
      "Analyse introuvable."
    );
  }

  records[index].status = result;

  records[index].result = {
    status: result,
    recordedAt:
      new Date().toISOString()
  };

  saveAll(records);

  return normalizePrediction(
    records[index]
  );
}

module.exports = {
  savePrediction,
  listPredictions,
  updateResult,
  ENVIRONMENTS
};
