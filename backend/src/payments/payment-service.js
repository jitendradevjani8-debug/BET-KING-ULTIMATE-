"use strict";

const { PAYMENT_STATUS, isValidPaymentStatus } = require("./payment-status");
const { createPayment } = require("./payment-model");

const payments = new Map();

function createTestPayment({
  id,
  userId,
  planId,
  amount,
  currency = "GNF"
}) {
  const payment = createPayment({
    id,
    userId,
    planId,
    amount,
    currency,
    status: PAYMENT_STATUS.PENDING,
    provider: "TEST"
  });

  payments.set(payment.id, payment);

  return payment;
}

function updateTestPaymentStatus(
  paymentId,
  status
) {
  if (!isValidPaymentStatus(status)) {
    throw new Error(
      "Statut de paiement invalide."
    );
  }

  const payment = payments.get(paymentId);

  if (!payment) {
    throw new Error(
      "Paiement introuvable."
    );
  }

  if (payment.status !== PAYMENT_STATUS.PENDING) {
    throw new Error(
      "Seul un paiement PENDING peut changer de statut."
    );
  }

  const updatedPayment = createPayment({
    ...payment,
    status,
    updatedAt: new Date().toISOString()
  });

  payments.set(
    updatedPayment.id,
    updatedPayment
  );

  return updatedPayment;
}

function getTestPayment(paymentId) {
  return payments.get(paymentId) || null;
}

function listTestPayments() {
  return Array.from(payments.values());
}

module.exports = {
  createTestPayment,
  updateTestPaymentStatus,
  getTestPayment,
  listTestPayments
};
