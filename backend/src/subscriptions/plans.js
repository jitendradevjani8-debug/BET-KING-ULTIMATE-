"use strict";

/*
 * ==========================================
 * BET KING ULTIMATE
 * PHASE 12.1 — SUBSCRIPTION PLANS
 * ==========================================
 */

const PLANS = Object.freeze({
  FREE: Object.freeze({
    id: "FREE",
    name: "FREE",
    description: "Accès de base",
    price: 0,
    currency: "XOF",
    durationDays: 0,
    features: Object.freeze([
      "dashboard_basic"
    ])
  }),

  VIP: Object.freeze({
    id: "VIP",
    name: "VIP",
    description: "Accès aux fonctionnalités premium",
    price: 0,
    currency: "XOF",
    durationDays: 30,
    features: Object.freeze([
      "dashboard_basic",
      "high_confidence",
      "ultra_vip"
    ])
  }),

  OWNER: Object.freeze({
    id: "OWNER",
    name: "OWNER",
    description: "Contrôle complet du système",
    price: 0,
    currency: "XOF",
    durationDays: 0,
    features: Object.freeze([
      "dashboard_basic",
      "high_confidence",
      "ultra_vip",
      "owner_control_center",
      "subscription_management"
    ])
  })
});

function getPlan(planId) {
  if (typeof planId !== "string") {
    return null;
  }

  return PLANS[planId.toUpperCase()] || null;
}

function listPlans() {
  return Object.values(PLANS);
}

module.exports = {
  PLANS,
  getPlan,
  listPlans
};
