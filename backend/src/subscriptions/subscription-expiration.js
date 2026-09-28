"use strict";

/*
 * ==========================================
 * BET KING ULTIMATE
 * PHASE 12.3 — EXPIRATION
 * ==========================================
 */

function isExpired(subscription, now = new Date()) {
  if (!subscription) {
    return false;
  }

  if (!subscription.expiresAt) {
    return false;
  }

  const expiresAt =
    new Date(subscription.expiresAt);

  if (Number.isNaN(expiresAt.getTime())) {
    throw new Error(
      "Date d'expiration invalide."
    );
  }

  return expiresAt.getTime() <= now.getTime();
}

function getEffectiveStatus(
  subscription,
  now = new Date()
) {
  if (!subscription) {
    return null;
  }

  if (
    subscription.status === "ACTIVE" &&
    isExpired(subscription, now)
  ) {
    return "EXPIRED";
  }

  return subscription.status;
}

module.exports = {
  isExpired,
  getEffectiveStatus
};
