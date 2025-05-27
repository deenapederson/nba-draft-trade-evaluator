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
- Users can save trade concepts (localStorage) and compare multiple trade concepts.

---
## Architectural Decisions

- React Hooks: State is managed using React’s built-in hooks (useState, useEffect) for simplicity and speed.
- Draft Pick Data Format: Draft pick objects are converted to JSON to enable easy persistence using localStorage (JSON.stringify() / JSON.parse()).
- Styling: Styled-components are used to provide component-scoped styles and support rapid UI iteration.
- Trade Evaluation Logic: A straightforward additive model is used to sum normalized pick values per team. This keeps calculations fast and the user interface responsive while allowing room for future enhancements (e.g., more nuanced valuations).

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
- Support 3+ team trades (multi-team trade logic & UI)
- Attach notes/comments to saved trade concepts
- Allow edit & update saved trades
- Implement more nuanced trade evaluations
