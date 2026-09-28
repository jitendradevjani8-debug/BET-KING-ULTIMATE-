"use strict";

const http = require("http");

const {
  buildOwnerControlCenter
} = require("../owner/control-center");

const {
  runHighConfidence
} = require("../high-confidence/pipeline");

const {
  runUltraVip
} = require("../ultra-vip/pipeline");

const {
  login,
  logout,
  getAuthenticatedUser
} = require("../auth/auth-service");

const {
  getSubscriptionInfo,
  checkUserPermission,
  renewExpiredSubscription
} = require("../subscriptions/subscription-service");


const {
  requireAuth,
  requireRoles
} = require("../auth/permissions");

const HOST = "127.0.0.1";
const PORT = 3001;

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(
    data,
    null,
    2
  );

  res.writeHead(
    statusCode,
    {
      "Content-Type":
        "application/json; charset=utf-8",

      "Access-Control-Allow-Origin":
        "*",

      "Access-Control-Allow-Methods":
        "GET,POST,OPTIONS",

      "Access-Control-Allow-Headers":
        "Content-Type, Authorization"
    }
  );

  res.end(body);
}

function sendError(
  res,
  statusCode,
  message
) {
  sendJson(res, statusCode, {
    error: message,
    warning:
      "BET KING ULTIMATE fournit des estimations statistiques expérimentales. Aucun résultat n'est garanti."
  });
}

function readBody(req) {
  return new Promise(
    (resolve, reject) => {
      let body = "";

      req.on(
        "data",
        chunk => {
          body += chunk;
        }
      );

      req.on(
        "end",
        () => {
          if (!body) {
            resolve({});
            return;
          }

          try {
            resolve(
              JSON.parse(body)
            );
          } catch {
            reject(
              new Error(
                "JSON invalide."
              )
            );
          }
        }
      );

      req.on(
        "error",
        reject
      );
    }
  );
}

const server =
  http.createServer(
    async (req, res) => {
      try {
        if (
          req.method ===
          "OPTIONS"
        ) {
          sendJson(res, 200, {
            ok: true
          });

          return;
        }

        /*
         * ==========================================
         * HEALTH PUBLIC
         * ==========================================
         */
        if (
          req.method === "GET" &&
          req.url === "/api/health"
        ) {
          sendJson(res, 200, {
            ok: true,
            app:
              "BET KING ULTIMATE",
            phase: 11,
            api: "mobile-v1",
            environment:
              "TEST",
            message:
              "API mobile opérationnelle."
          });

          return;
        }

        /*
         * ==========================================
         * AUTO OWNER — DEV UNIQUEMENT
         * ==========================================
         */
        if (
          req.method === "POST" &&
          req.url === "/api/auth/auto-owner"
        ) {
          if (process.env.NODE_ENV === "production") {
            sendError(
              res,
              404,
              "Route indisponible en production."
            );
            return;
          }

          const {
            ensureOwner
          } = require("../auth/user-store");

          const owner = ensureOwner();

          const {
            createSession
          } = require("../auth/session-store");

          const session =
            createSession(owner);

          sendJson(
            res,
            200,
            {
              ok: true,
              user: owner,
              session
            }
          );

          return;
        }

        /*
         * ==========================================
         * LOGIN
         * ==========================================
         */
        if (
          req.method === "POST" &&
          req.url === "/api/auth/login"
        ) {
          const body =
            await readBody(req);

          if (
            !body.username ||
            !body.password
          ) {
            sendError(
              res,
              400,
              "Username et password requis."
            );

            return;
          }

          const result =
            login(
              body.username,
              body.password
            );

          if (!result.ok) {
            sendError(
              res,
              401,
              result.error ||
                "Identifiants invalides."
            );

            return;
          }

          sendJson(
            res,
            200,
            {
              ok: true,
              user: result.user,
              session: result.session
            }
          );

          return;
        }

        /*
         * ==========================================
         * LOGOUT
         * ==========================================
         */
        if (
          req.method === "POST" &&
          req.url === "/api/auth/logout"
        ) {
          const user =
            getAuthenticatedUser(req);

          if (!user) {
            sendError(
              res,
              401,
              "Authentification requise."
            );

            return;
          }

          const authorization =
            req.headers.authorization || "";

          const parts =
            authorization.split(" ");

          const token =
            parts.length === 2 &&
            parts[0] === "Bearer"
              ? parts[1]
              : null;

          logout(token);

          sendJson(
            res,
            200,
            {
              ok: true,
              message:
                "Session fermée."
            }
          );

          return;
        }

        /*
         * ==========================================
         * SUBSCRIPTION — MON ABONNEMENT
         * ==========================================
         */
        if (
          req.method === "GET" &&
          req.url === "/api/subscription/me"
        ) {
          const user =
            getAuthenticatedUser(req);

          if (!user) {
            sendError(
              res,
              401,
              "Authentification requise."
            );

            return;
          }

          const info =
            getSubscriptionInfo(
              user.id
            );

          sendJson(
            res,
            200,
            {
              ok: true,
              user: {
                id: user.id,
                username: user.username,
                role: user.role
              },
              subscription:
                info.subscription,
              permissions:
                info.permissions
            }
          );

          return;
        }

        /*
         * ==========================================
         * SUBSCRIPTION — PERMISSIONS
         * ==========================================
         */
        if (
          req.method === "GET" &&
          req.url ===
            "/api/subscription/permissions"
        ) {
          const user =
            getAuthenticatedUser(req);

          if (!user) {
            sendError(
              res,
              401,
              "Authentification requise."
            );

            return;
          }

          const info =
            getSubscriptionInfo(
              user.id
            );

          sendJson(
            res,
            200,
            {
              ok: true,
              permissions:
                info.permissions
            }
          );

          return;
        }

        /*
         * ==========================================
         * SUBSCRIPTION — CHECK ACCESS
         * ==========================================
         */
        if (
          req.method === "POST" &&
          req.url ===
            "/api/subscription/check-access"
        ) {
          const user =
            getAuthenticatedUser(req);

          if (!user) {
            sendError(
              res,
              401,
              "Authentification requise."
            );

            return;
          }

          const body =
            await readBody(req);

          if (
            typeof body.permission !==
            "string" ||
            !body.permission
          ) {
            sendError(
              res,
              400,
              "Permission requise."
            );

            return;
          }

          const result =
            checkUserPermission(
              user.id,
              body.permission
            );

          sendJson(
            res,
            200,
            {
              ok: true,
              permission:
                result.permission,
              allowed:
                result.allowed
            }
          );

          return;
        }

        /*
         * ==========================================
         * SUBSCRIPTION — RENEW
         * ==========================================
         */
        if (
          req.method === "POST" &&
          req.url ===
            "/api/subscription/renew"
        ) {
          const user =
            getAuthenticatedUser(req);

          if (!user) {
            sendError(
              res,
              401,
              "Authentification requise."
            );

            return;
          }

          const body =
            await readBody(req);

          let planId =
            body.planId;

          if (
            planId !== undefined &&
            typeof planId !== "string"
          ) {
            sendError(
              res,
              400,
              "planId invalide."
            );

            return;
          }

          const result =
            renewExpiredSubscription(
              user.id,
              planId
            );

          sendJson(
            res,
            200,
            {
              ok: true,
              subscription:
                result
            }
          );

          return;
        }

        /*
         * ==========================================
         * DASHBOARD OWNER / ADMIN
         * ==========================================
         */
        if (
          req.method === "GET" &&
          req.url ===
            "/api/owner/dashboard"
        ) {
          const auth =
            requireRoles(
              req,
              ["OWNER", "ADMIN"]
            );

          if (!auth.ok) {
            sendError(
              res,
              auth.status,
              auth.error
            );

            return;
          }

          const dashboard =
            buildOwnerControlCenter();

          sendJson(
            res,
            200,
            dashboard
          );

          return;
        }

        /*
         * ==========================================
         * HIGH CONFIDENCE
         * OWNER / ADMIN / MEMBER
         * ==========================================
         */
        if (
          req.method === "POST" &&
          req.url ===
            "/api/high-confidence"
        ) {
          const auth =
            requireRoles(
              req,
              [
                "OWNER",
                "ADMIN",
                "MEMBER"
              ]
            );

          if (!auth.ok) {
            sendError(
              res,
              auth.status,
              auth.error
            );

            return;
          }

          const body =
            await readBody(req);

          const result =
            runHighConfidence(
              body
            );

          sendJson(
            res,
            200,
            result
          );

          return;
        }

        /*
         * ==========================================
         * ULTRA VIP
         * OWNER / ADMIN / MEMBER
         * ==========================================
         */
        if (
          req.method === "POST" &&
          req.url ===
            "/api/ultra-vip"
        ) {
          const auth =
            requireRoles(
              req,
              [
                "OWNER",
                "ADMIN",
                "MEMBER"
              ]
            );

          if (!auth.ok) {
            sendError(
              res,
              auth.status,
              auth.error
            );

            return;
          }

          const body =
            await readBody(req);

          const result =
            runUltraVip(
              body
            );

          sendJson(
            res,
            200,
            result
          );

          return;
        }

        sendError(
          res,
          404,
          "Route API introuvable."
        );
      } catch (error) {
        console.error(
          "API ERROR:",
          error.message
        );

        sendError(
          res,
          400,
          error.message
        );
      }
    }
  );

server.listen(
  PORT,
  HOST,
  () => {
    console.log(
      "======================================"
    );

    console.log(
      " BET KING ULTIMATE — MOBILE API"
    );

    console.log(
      "======================================"
    );

    console.log(
      `API démarrée sur http://${HOST}:${PORT}`
    );

    console.log(
      "Health : /api/health"
    );

    console.log(
      "Login : POST /api/auth/login"
    );

    console.log(
      "Logout : POST /api/auth/logout"
    );

    console.log(
      "Dashboard : /api/owner/dashboard"
    );

    console.log(
      "HIGH CONFIDENCE : POST /api/high-confidence"
    );

    console.log(
      "ULTRA VIP : POST /api/ultra-vip"
    );

    console.log(
      "======================================"
    );
  }
);

module.exports = {
  server
};
