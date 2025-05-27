import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Button from './components/Button'
import Header from './components/Header'
import Card from './components/Card'
import styled from 'styled-components'
import theme from './styles/theme'
import SavedCard from './components/SavedCard'
import Footer from './components/Footer'

const Container = styled.div`
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto;   
  
  min-height: 100vh;
  min-width: 100vw;
  overflow-y: scroll;

  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
`
const SavedTradesContainer = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  overflow-y: auto;
  padding: 1rem;
`

const WarningMessage = styled.div`
  color: ${theme.colors.error};
  font-size: 14px;
`

function App() {
  const [view, setView] = useState('createTradePage')
  const [favoredTeam, setFavoredTeam] = useState('')
  const [cardA, setCardA] = useState({ team: '', picks: [], total_value: 0 })
  const [cardB, setCardB] = useState({ team: '', picks: [], total_value: 0 })
  const [savedTrades, setSavedTrades] = useState(() => {
    return JSON.parse(localStorage.getItem("savedTrades")) || [];
  })
  const [warningMessage, setWarningMessage] = useState(null)

  console.log('render')

  const handleCompareTrade = () => {

    if(!cardA.team || !cardB.team) {
      setWarningMessage('Select teams to compare trade')
      return
    }

    if(cardA.picks.length === 0 || cardB.picks.length === 0) {
      setWarningMessage('Each team must recieve at least one pick to compare')
      return
    }

    if (cardA.total_value > cardB.total_value) {
      setFavoredTeam("A")
    } else if (cardB.total_value > cardA.total_value) {
      setFavoredTeam("B")

    } else {
      setFavoredTeam("Even")
    }

    setWarningMessage(null)
  }

  useEffect(() => {
    setFavoredTeam('')
  }, [cardA, cardB])

  const handleSaveTrade = async () => {
     const newTrade = {
      trade: {cardA, cardB},
      timestamp: new Date().toISOString()
    }
    const existingTrades = JSON.parse(localStorage.getItem("savedTrades")) || []

    const updatedTrades = [...existingTrades, newTrade];
    localStorage.setItem("savedTrades", JSON.stringify(updatedTrades))

    setFavoredTeam(null)
    setCardA({ team: '', picks: [], total_value: 0 })
    setCardB({ team: '', picks: [], total_value: 0 })
    setSavedTrades(updatedTrades)
    setWarningMessage(null)
  }

  return (
    <Container>
      <Header>
        <h2>NBA DRAFT EVALUATION TOOL</h2>

        { view === 'createTradePage' ? (
          <Button onClick={() => setView('savedTradesPage')}>VIEW SAVED TRADES</Button>
        ) : (
          <Button onClick={() => setView('createTradePage')}>CREATE NEW TRADE</Button>
        )}

      </Header>
      
      { view === 'createTradePage' ? (
        <>
          <Card 
            cardData={cardA}
            setCardData={setCardA}
            otherSelectedTeam={cardB.team}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
            <Button onClick={handleCompareTrade}>COMPARE</Button>
            <WarningMessage>{warningMessage}</WarningMessage>
          </div>
          <Card 
            cardData={cardB}
            setCardData={setCardB}
            otherSelectedTeam={cardA.team}
          />
        </>
      ) : (
        <SavedTradesContainer>
          {savedTrades.length === 0 ? (
            <div style={{ fontStyle: 'italic', textAlign: 'center', fontSize: '18pt' }}>No trades saved.</div>
          ) : (
            savedTrades.map((trade) => (
              <SavedCard 
                cardData={trade.trade}
                key={trade.timestamp}
                tradeKey={trade.timestamp}
                setSavedTrades={setSavedTrades}
              />
            ))
          )}

        </SavedTradesContainer>
      )}

      
      <Footer>
        
        {favoredTeam && favoredTeam === "A" && 
          <div>This trade favors the {cardA.team} by {cardA.total_value - cardB.total_value} points</div>
        }
        {favoredTeam && favoredTeam === "B" && 
          <div>This trade favors the {cardB.team} by {cardB.total_value - cardA.total_value} points</div>
        }
         {favoredTeam && favoredTeam === "Even" && 
          <div>This trade is even</div>
        }
        {favoredTeam && 
          <Button onClick={handleSaveTrade}>SAVE TRADE</Button>
        }
        
      </Footer>
    </Container>
  )
}

export default App
