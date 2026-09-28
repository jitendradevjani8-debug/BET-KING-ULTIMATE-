"use strict";

const { PAYMENT_STATUS, isValidPaymentStatus } = require("./payment-status");

const SUPPORTED_CURRENCIES = Object.freeze([
  "GNF",
  "USD",
  "EUR"
]);

function isValidCurrency(currency) {
  return SUPPORTED_CURRENCIES.includes(currency);
}

function createPayment({
  id,
  userId,
  planId,
  amount,
  currency = "GNF",
  status = PAYMENT_STATUS.PENDING,
  provider = "TEST",
  createdAt = new Date().toISOString(),
  updatedAt = createdAt
} = {}) {
  if (!id) {
    throw new Error("Identifiant de paiement obligatoire.");
  }

  if (!userId) {
    throw new Error("Identifiant utilisateur obligatoire.");
  }

  if (!planId) {
    throw new Error("Plan obligatoire.");
  }

  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("Montant de paiement invalide.");
  }

  if (!isValidPaymentStatus(status)) {
    throw new Error("Statut de paiement invalide.");
  }

  if (!isValidCurrency(currency)) {
    throw new Error(
      "Devise invalide. Devises autorisées : GNF, USD, EUR."
    );
  }

  if (provider !== "TEST") {
    throw new Error("Ce module accepte uniquement le fournisseur TEST.");
  }

  return Object.freeze({
    id,
    userId,
    planId,
    amount,
    currency,
    status,
    provider,
    createdAt,
    updatedAt
  });
}

module.exports = {
  SUPPORTED_CURRENCIES,
  isValidCurrency,
  createPayment
};
