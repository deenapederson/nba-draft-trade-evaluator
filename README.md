# NBA Draft Trade Simulator

A web application that allows users to simulate and evaluate NBA draft pick trades between teams. 

[View the deployed app](https://deenapederson.github.io/nba-draft-trade-evaluator/)

---

## Features

1. Build trade scenarios involving 2 NBA teams.
2. Add draft picks for each team for the next 7 years.
3. Evaluate  and display trade balance using a point-based value system.
4. Save trade concepts to compare them later.

---

## Tech Stack

- React + Vite
- Styled Components
- JavaScript (ES6)
- GitHub Pages (for deployment)

---

## Implementation Details

- Draft pick values are based on [Draft Pick Trade Value Chart - 2017 Version - Kevin Pelton](http://nbasense.com/draft-pick-trade-value/2/kevin-pelton-2), with each pick assigned a normalized value.
- Each trade is calculated in real-time using the sum of pick values per team.
- A basic warning system flags when a trade favors one side.
- Users can save trade concepts (localStoarage) and compare multiple trade concepts.

---

## Setup Instructions

Clone the repo and run locally:

```bash
git clone https://github.com/deenapederson/nba-draft-trade-evaluator.git
cd nba-draft-trade-evaluator
npm install
npm run dev
```
Deployment Instructions:
```
npm run build
npm run deploy
```

### Future Enhancements 
- Support 3+ Team Trades
- Allow users to attach notes to trade concepts/saved trade concepts
- Support editing saved trades
