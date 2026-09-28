"use strict";

const {
  createUser,
  ROLES
} = require("./user-store");

const username =
  process.env.BETKING_USERNAME;

const password =
  process.env.BETKING_PASSWORD;

const role =
  process.env.BETKING_ROLE || ROLES.MEMBER;

const displayName =
  process.env.BETKING_DISPLAY_NAME ||
  username;

if (!username || !password) {
  console.error(
    "Usage:"
  );

  console.error(
    "BETKING_USERNAME=... BETKING_PASSWORD=... " +
    "BETKING_ROLE=ADMIN|MEMBER " +
    "node src/auth/create-user.js"
  );

  process.exit(1);
}

if (
  role !== ROLES.ADMIN &&
  role !== ROLES.MEMBER
) {
  console.error(
    "ROLE doit être ADMIN ou MEMBER."
  );

  process.exit(1);
}

try {
  const user =
    createUser({
      username,
      password,
      role,
      displayName
    });

  console.log(
    "=============================================="
  );

  console.log(
    " UTILISATEUR CREE"
  );

  console.log(
    "=============================================="
  );

  console.log(
    "username :", user.username
  );

  console.log(
    "role     :", user.role
  );

  console.log(
    "active   :", user.active
  );

  console.log(
    "=============================================="
  );

} catch (error) {

  console.error(
    "ERREUR:",
    error.message
  );

  process.exit(1);
}
