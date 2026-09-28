"use strict";

const {
  getAuthenticatedUser
} = require("./auth-service");

function requireAuth(req) {
  const session =
    getAuthenticatedUser(req);

  if (!session) {
    return {
      ok: false,
      status: 401,
      error: "Authentification requise."
    };
  }

  return {
    ok: true,
    session
  };
}

function requireRoles(req, allowedRoles) {
  const auth =
    requireAuth(req);

  if (!auth.ok) {
    return auth;
  }

  if (!allowedRoles.includes(auth.session.role)) {
    return {
      ok: false,
      status: 403,
      error: "Accès refusé pour ce rôle."
    };
  }

  return auth;
}

module.exports = {
  requireAuth,
  requireRoles
};
