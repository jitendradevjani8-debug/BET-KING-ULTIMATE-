"use strict";

const {
  authenticate
} = require("./user-store");

const {
  createSession,
  getSession,
  destroySession
} = require("./session-store");

function login(username, password) {
  const user =
    authenticate(
      username,
      password
    );

  if (!user) {
    return {
      success: false,
      error: "Identifiants invalides."
    };
  }

  const session =
    createSession(user);

  return {
    ok: true,
    success: true,
    user,
    session
  };
}

function logout(token) {
  destroySession(token);

  return {
    success: true
  };
}

function getAuthenticatedUser(req) {
  const header =
    req.headers.authorization || "";

  if (
    !header.startsWith("Bearer ")
  ) {
    return null;
  }

  const token =
    header.slice(7).trim();

  if (!token) {
    return null;
  }

  return getSession(token);
}

module.exports = {
  login,
  logout,
  getAuthenticatedUser
};
