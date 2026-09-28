"use strict";

const {
  PAYMENT_STATUS
} = require("./payment-status");

const {
  getTestPayment
} = require("./payment-service");

const {
  getPlan
} = require("../subscriptions/plans");

const {
  createSubscription,
  getUserSubscription,
  renewUserSubscription
} = require("../subscriptions/subscription-store");


function applySuccessfulPaymentToSubscription(
  paymentId,
  {
    now = new Date()
  } = {}
) {
  if (
    typeof paymentId !== "string" ||
    !paymentId
  ) {
    throw new Error(
      "paymentId obligatoire."
    );
  }

  const payment =
    getTestPayment(paymentId);

  if (!payment) {
    throw new Error(
      "Paiement introuvable."
    );
  }

  if (
    payment.provider !== "TEST"
  ) {
    throw new Error(
      "Seuls les paiements TEST peuvent être appliqués."
    );
  }

  if (
    payment.status !==
    PAYMENT_STATUS.SUCCESS
  ) {
    throw new Error(
      "Le paiement doit être SUCCESS avant activation de l'abonnement."
    );
  }

  const plan =
    getPlan(payment.planId);

  if (!plan) {
    throw new Error(
      "Plan d'abonnement invalide."
    );
  }

  const current =
    getUserSubscription(
      payment.userId,
      now
    );

  if (
    current &&
    current.effectiveStatus === "ACTIVE"
  ) {
    return {
      payment,
      subscription: current,
      subscriptionAction: "ALREADY_ACTIVE"
    };
  }

  if (
    current &&
    current.effectiveStatus === "EXPIRED"
  ) {
    const renewed =
      renewUserSubscription(
        payment.userId,
        {
          planId:
            payment.planId,
          now
        }
      );

    return {
      payment,
      subscription: renewed,
      subscriptionAction: "RENEWED"
    };
  }

  const expiresAt =
    plan.durationDays > 0
      ? new Date(
          now.getTime() +
          plan.durationDays *
          24 *
          60 *
          60 *
          1000
        ).toISOString()
      : null;

  const subscription =
    createSubscription({
      userId:
        payment.userId,

      planId:
        payment.planId,

      status:
        "ACTIVE",

      startsAt:
        now.toISOString(),

      expiresAt
    });

  return {
    payment,
    subscription,
    subscriptionAction: "CREATED"
  };
}


module.exports = {
  applySuccessfulPaymentToSubscription
};
