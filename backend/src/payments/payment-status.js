"use strict";

const PAYMENT_STATUS = Object.freeze({
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED"
});

function isValidPaymentStatus(status) {
  return Object.values(PAYMENT_STATUS).includes(status);
}

module.exports = {
  PAYMENT_STATUS,
  isValidPaymentStatus
};
