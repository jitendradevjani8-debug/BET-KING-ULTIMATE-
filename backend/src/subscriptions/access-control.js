"use strict";

const {
  getUserSubscription,
  userHasPermission
} = require("./subscription-store");

function checkAccess(
  userId,
  permission,
  now = new Date()
) {
  if (!userId) {
    return {
      allowed: false,
      reason: "USER_REQUIRED"
    };
  }

  if (!permission) {
    return {
      allowed: false,
      reason: "PERMISSION_REQUIRED"
    };
  }

  const subscription =
    getUserSubscription(
      userId,
      now
    );

  if (!subscription) {
    return {
      allowed: false,
      reason: "SUBSCRIPTION_NOT_FOUND"
    };
  }

  if (
    subscription.effectiveStatus !==
    "ACTIVE"
  ) {
    return {
      allowed: false,
      reason: "SUBSCRIPTION_INACTIVE"
    };
  }

  if (
    !userHasPermission(
      userId,
      permission,
      now
    )
  ) {
    return {
      allowed: false,
      reason: "PERMISSION_DENIED"
    };
  }

  return {
    allowed: true,
    reason: "ACCESS_GRANTED",
    subscription
  };
}

function requireAccess(
  userId,
  permission,
  now = new Date()
) {
  const result =
    checkAccess(
      userId,
      permission,
      now
    );

  if (!result.allowed) {
    throw new Error(
      `Accès refusé : ${result.reason}`
    );
  }

  return result;
}

module.exports = {
  checkAccess,
  requireAccess
};
