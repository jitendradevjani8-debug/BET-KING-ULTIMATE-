"use strict";

const {
  PAYMENT_STATUS
} = require("./payment-status");

const {
  getTestPayment,
  updateTestPaymentStatus
} = require("./payment-service");

function processTestPaymentWebhook({
  paymentId,
  event
} = {}) {
  if (
    typeof paymentId !== "string" ||
    !paymentId
  ) {
    throw new Error(
      "paymentId obligatoire."
    );
  }

  if (event !== PAYMENT_STATUS.SUCCESS) {
    throw new Error(
      "Le webhook TEST accepte uniquement l'événement SUCCESS."
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
    payment.status ===
    PAYMENT_STATUS.SUCCESS
  ) {
    return {
      payment,
      alreadyProcessed: true
    };
  }

  if (
    payment.status !==
    PAYMENT_STATUS.PENDING
  ) {
    throw new Error(
      "Seul un paiement PENDING peut être confirmé par le webhook."
    );
  }

  const updatedPayment =
    updateTestPaymentStatus(
      paymentId,
      PAYMENT_STATUS.SUCCESS
    );

  return {
    payment: updatedPayment,
    alreadyProcessed: false
  };
}

module.exports = {
  processTestPaymentWebhook
};
