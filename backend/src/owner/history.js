"use strict";

function filterOwnerHistory(
  predictions,
  filters = {}
) {
  if (!Array.isArray(predictions)) {
    throw new Error(
      "Historique invalide."
    );
  }

  const {
    mode,
    status,
    result,
    search
  } = filters;

  let filtered = [...predictions];

  if (mode) {
    filtered = filtered.filter(
      (item) => item.mode === mode
    );
  }

  if (status) {
    filtered = filtered.filter(
      (item) => item.status === status
    );
  }

  if (result) {
    filtered = filtered.filter(
      (item) => item.result === result
    );
  }

  if (search) {
    const query = String(search)
      .trim()
      .toLowerCase();

    if (query) {
      filtered = filtered.filter(
        (item) =>
          String(item.match || "")
            .toLowerCase()
            .includes(query)
      );
    }
  }

  return {
    filters: {
      mode: mode || null,
      status: status || null,
      result: result || null,
      search: search || null
    },

    total: filtered.length,

    predictions: filtered
  };
}

module.exports = {
  filterOwnerHistory
};
