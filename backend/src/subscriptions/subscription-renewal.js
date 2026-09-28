"use strict";

const {
  getPlan
} = require("./plans");

function renewSubscription(
  subscription,
  {
    planId = subscription?.planId,
    now = new Date()
  } = {}
) {
  if (!subscription) {
    throw new Error(
      "Abonnement obligatoire."
    );
  }

  if (
    subscription.status !== "ACTIVE"
  ) {
    throw new Error(
      "Seul un abonnement ACTIVE peut être renouvelé."
    );
  }

  const plan =
    getPlan(planId);

  if (!plan) {
    throw new Error(
      "Plan d'abonnement invalide."
    );
  }

  if (
    !plan.durationDays ||
    plan.durationDays <= 0
  ) {
    throw new Error(
      "Ce plan ne possède pas de durée renouvelable."
    );
  }

  const currentExpiration =
    subscription.expiresAt
      ? new Date(subscription.expiresAt)
      : now;

  if (
    Number.isNaN(
      currentExpiration.getTime()
    )
  ) {
    throw new Error(
      "Date d'expiration invalide."
    );
  }

  if (
    currentExpiration.getTime() >
    now.getTime()
  ) {
    throw new Error(
      "L'abonnement est encore actif."
    );
  }

  const newExpiration =
    new Date(
      now.getTime() +
      plan.durationDays *
      24 *
      60 *
      60 *
      1000
    );

  return {
    ...subscription,

    id: undefined,

    planId: plan.id,

    status: "ACTIVE",

    startsAt:
      now.toISOString(),

    expiresAt:
      newExpiration.toISOString(),

    renewedFrom:
      subscription.id,

    renewedAt:
      now.toISOString(),

    createdAt:
      now.toISOString(),

    updatedAt:
      now.toISOString()
  };
}

module.exports = {
  renewSubscription
};
