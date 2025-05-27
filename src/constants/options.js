// Generate a list of the next 7 tradable draft years
const today = new Date()
const draftCutoff = new Date(today.getFullYear(), 5, 25)

// If before the draf (June), include next year’s pick
const startYear = today < draftCutoff ? today.getFullYear() + 1 : today.getFullYear() + 2

export const YEARS = Array.from({ length: 7 }, (_, i) => startYear + i)

// NBA Teams
export const NBA_TEAMS = [
  "Atlanta Hawks",
  "Boston Celtics",
  "Brooklyn Nets",
  "Charlotte Hornets",
  "Chicago Bulls",
  "Cleveland Cavaliers",
  "Dallas Mavericks",
  "Denver Nuggets",
  "Detroit Pistons",
  "Golden State Warriors",
  "Houston Rockets",
  "Indiana Pacers",
  "Los Angeles Clippers",
  "Los Angeles Lakers",
  "Memphis Grizzlies",
  "Miami Heat",
  "Milwaukee Bucks",
  "Minnesota Timberwolves",
  "New Orleans Pelicans",
  "New York Knicks",
  "Oklahoma City Thunder",
  "Orlando Magic",
  "Philadelphia 76ers",
  "Phoenix Suns",
  "Portland Trail Blazers",
  "Sacramento Kings",
  "San Antonio Spurs",
  "Toronto Raptors",
  "Utah Jazz",
  "Washington Wizards"
]

// Picks 1-60
export const DRAFT_PICKS = Array.from({ length: 60 }, (_, i) => i + 1 )

// Normalized Pick Valuation (2017 Kevin Pelton)
export const PICK_VALUE_CHART = {
  1: 100.00,
  2: 77.50,
  3: 66.75,
  4: 60.25,
  5: 56.00,
  6: 52.75,
  7: 50.00,
  8: 47.75,
  9: 45.75,
  10: 43.00,
  11: 40.00,
  12: 37.50,
  13: 35.00,
  14: 33.00,
  15: 31.00,
  16: 29.50,
  17: 28.25,
  18: 27.00,
  19: 25.75,
  20: 24.50,
  21: 23.00,
  22: 21.50,
  23: 20.00,
  24: 18.75,
  25: 17.50,
  26: 16.50,
  27: 15.50,
  28: 14.25,
  29: 13.00,
  30: 11.75,
  31: 9.00,
  32: 8.75,
  33: 8.25,
  34: 8.00,
  35: 7.50,
  36: 7.25,
  37: 7.00,
  38: 6.75,
  39: 6.25,
  40: 6.00,
  41: 5.75,
  42: 5.50,
  43: 5.25,
  44: 5.00,
  45: 4.75,
  46: 4.50,
  47: 4.25,
  48: 4.00,
  49: 3.75,
  50: 3.50,
  51: 3.25,
  52: 3.00,
  53: 2.75,
  54: 2.50,
  55: 2.25,
  56: 2.25,
  57: 2.00,
  58: 1.75,
  59: 1.50,
  60: 1.25
}
