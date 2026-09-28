"use strict";

const {
  getUserSubscription,
  getUserPermissions,
  userHasPermission,
  renewUserSubscription
} = require("./subscription-store");

function getSubscriptionInfo(
  userId,
  now = new Date()
) {
  const subscription =
    getUserSubscription(
      userId,
      now
    );

  if (!subscription) {
    return {
      found: false,
      subscription: null,
      permissions: []
    };
  }

  return {
    found: true,
    subscription,
    permissions:
      getUserPermissions(
        userId,
        now
      )
  };
}

function checkUserPermission(
  userId,
  permission,
  now = new Date()
) {
  return {
    userId,
    permission,
    allowed:
      userHasPermission(
        userId,
        permission,
        now
      )
  };
}

function renewExpiredSubscription(
  userId,
  planId,
  now = new Date()
) {
  return renewUserSubscription(
    userId,
    {
      planId,
      now
    }
  );
}

module.exports = {
  getSubscriptionInfo,
  checkUserPermission,
  renewExpiredSubscription
};
