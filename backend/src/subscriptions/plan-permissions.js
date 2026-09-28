"use strict";

const {
  getPlan
} = require("./plans");

function hasPermission(
  planId,
  permission
) {
  if (
    typeof planId !== "string" ||
    typeof permission !== "string"
  ) {
    return false;
  }

  const plan =
    getPlan(planId);

  if (!plan) {
    return false;
  }

  return plan.features.includes(
    permission
  );
}

function getPermissions(
  planId
) {
  const plan =
    getPlan(planId);

  if (!plan) {
    return [];
  }

  return [
    ...plan.features
  ];
}

function requirePermission(
  planId,
  permission
) {
  if (
    !hasPermission(
      planId,
      permission
    )
  ) {
    throw new Error(
      `Permission refusée : ${permission}`
    );
  }

  return true;
}

module.exports = {
  hasPermission,
  getPermissions,
  requirePermission
};
