"use strict";

const historicalMatches = [
  {
    id: "BT001",
    match: "Equipe A vs Equipe B",
    homeExpectedGoals: 2.1,
    awayExpectedGoals: 0.8,
    market: "homeWin",
    odds: 1.70,
    actualResult: "WON"
  },
  {
    id: "BT002",
    match: "Equipe C vs Equipe D",
    homeExpectedGoals: 1.2,
    awayExpectedGoals: 1.4,
    market: "over15",
    odds: 1.35,
    actualResult: "WON"
  },
  {
    id: "BT003",
    match: "Equipe E vs Equipe F",
    homeExpectedGoals: 0.9,
    awayExpectedGoals: 1.8,
    market: "homeWin",
    odds: 2.10,
    actualResult: "LOST"
  },
  {
    id: "BT004",
    match: "Equipe G vs Equipe H",
    homeExpectedGoals: 1.8,
    awayExpectedGoals: 0.7,
    market: "over15",
    odds: 1.40,
    actualResult: "WON"
  },
  {
    id: "BT005",
    match: "Equipe I vs Equipe J",
    homeExpectedGoals: 1.1,
    awayExpectedGoals: 1.0,
    market: "homeWin",
    odds: 2.00,
    actualResult: "LOST"
  }
];

module.exports = {
  historicalMatches
};
