<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>BET KING ULTIMATE</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family:
        Arial,
        sans-serif;

      background: #0b1020;
      color: #ffffff;
    }

    .app {
      width: 100%;
      max-width: 520px;
      margin: 0 auto;
      min-height: 100vh;
      padding: 20px;
    }

    .header {
      padding: 24px 0;
      text-align: center;
    }

    .logo {
      font-size: 30px;
      font-weight: 800;
      letter-spacing: 1px;
    }

    .subtitle {
      margin-top: 8px;
      color: #9ca3af;
      font-size: 14px;
    }

    .environment {
      margin-top: 18px;
      display: inline-block;
      padding: 7px 14px;
      border-radius: 20px;
      background: #172554;
      color: #93c5fd;
      font-size: 12px;
      font-weight: 700;
    }

    .card {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 18px;
      padding: 18px;
      margin-bottom: 14px;
    }

    .card-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 14px;
    }

    .stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .stat {
      background: #0f172a;
      border-radius: 14px;
      padding: 14px;
    }

    .stat-label {
      color: #9ca3af;
      font-size: 12px;
    }

    .stat-value {
      margin-top: 6px;
      font-size: 24px;
      font-weight: 800;
    }

    .actions {
      display: grid;
      gap: 10px;
    }

    button {
      width: 100%;
      border: none;
      border-radius: 14px;
      padding: 16px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
    }

    .primary {
      background: #2563eb;
      color: #ffffff;
    }

    .secondary {
      background: #1f2937;
      color: #ffffff;
    }

    .status {
      color: #9ca3af;
      font-size: 13px;
      line-height: 1.5;
    }

    .footer {
      text-align: center;
      color: #6b7280;
      font-size: 11px;
      padding: 20px 0;
    }
  </style>
</head>

<body>

  <main class="app">

    <header class="header">

      <div class="logo">
        BET KING
      </div>

      <div class="subtitle">
        ULTIMATE
      </div>

      <div
        id="environment"
        class="environment"
      >
        TEST
      </div>

    </header>

    <section class="card">

      <div class="card-title">
        Owner Dashboard
      </div>

      <div class="stats">

        <div class="stat">
          <div class="stat-label">
            Predictions
          </div>

          <div
            id="totalPredictions"
            class="stat-value"
          >
            —
          </div>
        </div>

        <div class="stat">
          <div class="stat-label">
            HIGH CONFIDENCE
          </div>

          <div
            id="highConfidence"
            class="stat-value"
          >
            —
          </div>
        </div>

        <div class="stat">
          <div class="stat-label">
            ULTRA VIP
          </div>

          <div
            id="ultraVip"
            class="stat-value"
          >
            —
          </div>
        </div>

        <div class="stat">
          <div class="stat-label">
            Won
          </div>

          <div
            id="won"
            class="stat-value"
          >
            —
          </div>
        </div>

      </div>

    </section>

    <section class="card">

      <div class="card-title">
        Bankroll TEST
      </div>

      <div class="stats">

        <div class="stat">
          <div class="stat-label">
            Capital initial
          </div>

          <div
            id="initialBankroll"
            class="stat-value"
          >
            —
          </div>
        </div>

        <div class="stat">
          <div class="stat-label">
            Capital actuel
          </div>

          <div
            id="currentBankroll"
            class="stat-value"
          >
            —
          </div>
        </div>

      </div>

    </section>

    <section class="card">

      <div class="card-title">
        Modules
      </div>

      <div class="actions">

        <button
          class="primary"
          onclick="showMessage('HIGH CONFIDENCE bientôt disponible')"
        >
          🎯 HIGH CONFIDENCE
        </button>

        <button
          class="secondary"
          onclick="showMessage('ULTRA VIP MIX bientôt disponible')"
        >
          👑 ULTRA VIP MIX
        </button>

        <button
          class="secondary"
          onclick="loadDashboard()"
        >
          🔄 Actualiser
        </button>

      </div>

    </section>

    <section class="card">

      <div class="card-title">
        État du système
      </div>

      <div
        id="status"
        class="status"
      >
        Connexion à l'API...
      </div>

    </section>

    <div class="footer">
      BET KING ULTIMATE — Phase 10
    </div>

  </main>

<script>

const API =
  "http://127.0.0.1:3001";

function setText(
  id,
  value
) {
  document.getElementById(
    id
  ).textContent = value;
}

async function loadDashboard() {

  try {

    setText(
      "status",
      "Connexion à l'API..."
    );

    const response =
      await fetch(
        API +
        "/api/owner/dashboard"
      );

    if (!response.ok) {
      throw new Error(
        "API HTTP " +
        response.status
      );
    }

    const data =
      await response.json();

    const test =
      data.dashboard
        .environments
        .TEST;

    setText(
      "environment",
      data.dashboard
        .activeEnvironment
    );

    setText(
      "totalPredictions",
      test.summary
        .totalPredictions
    );

    setText(
      "highConfidence",
      test.summary
        .highConfidence
    );

    setText(
      "ultraVip",
      test.summary
        .ultraVipMix
    );

    setText(
      "won",
      test.summary
        .won
    );

    setText(
      "initialBankroll",
      test.bankroll
        .initial
    );

    setText(
      "currentBankroll",
      test.bankroll
        .current
    );

    setText(
      "status",
      "API connectée. " +
      "Dashboard TEST chargé."
    );

  } catch (error) {

    setText(
      "status",
      "Erreur API : " +
      error.message
    );

  }
}

function showMessage(
  message
) {
  setText(
    "status",
    message
  );
}

loadDashboard();

</script>

</body>
</html>
