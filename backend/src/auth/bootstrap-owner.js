"use strict";

const crypto = require("crypto");
const {
  ensureOwner
} = require("./user-store");

const username =
  process.env.BETKING_OWNER_USERNAME || "owner";

const password =
  process.env.BETKING_OWNER_PASSWORD ||
  crypto.randomBytes(12).toString("base64url");

const displayName =
  process.env.BETKING_OWNER_NAME ||
  "BET KING OWNER";

const existing = require("./user-store")
  .findByUsername(username);

if (existing) {
  console.log("==============================================");
  console.log(" OWNER EXISTE DEJA");
  console.log("==============================================");
  console.log("username :", existing.username);
  console.log("role     :", existing.role);
  console.log("active   :", existing.active);
  console.log("==============================================");
} else {
  const owner = ensureOwner(
    username,
    password,
    displayName
  );

  console.log("==============================================");
  console.log(" OWNER BET KING CREE");
  console.log("==============================================");
  console.log("username :", owner.username);
  console.log("role     :", owner.role);
  console.log("password :", password);
  console.log("==============================================");
  console.log("CONSERVE CE MOT DE PASSE.");
  console.log("Il sera nécessaire pour la connexion OWNER.");
  console.log("==============================================");
}
