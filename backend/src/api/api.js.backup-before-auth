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
        "Content-Type"
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

        if (
          req.method === "GET" &&
          req.url === "/api/health"
        ) {
          sendJson(res, 200, {
            ok: true,
            app:
              "BET KING ULTIMATE",
            phase: 10,
            api: "mobile-v1",
            environment:
              "TEST",
            message:
              "API mobile opérationnelle."
          });

          return;
        }

        if (
          req.method === "GET" &&
          req.url === "/api/owner/dashboard"
        ) {
          const dashboard =
            buildOwnerControlCenter();

          sendJson(
            res,
            200,
            dashboard
          );

          return;
        }

        if (
          req.method === "POST" &&
          req.url ===
            "/api/high-confidence"
        ) {
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

        if (
          req.method === "POST" &&
          req.url ===
            "/api/ultra-vip"
        ) {
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
