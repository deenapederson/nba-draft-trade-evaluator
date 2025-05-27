import styled from 'styled-components'
import theme from '../styles/theme'
import { CircleMinus } from 'lucide-react'
import TradeElement from './TradeElement'

/**
 * SavedCard Component
 *
 * Renders a non-editable summary of a saved trade between two teams, with delete icon to remove from users localStorage
 *
 * Props:
 *  - cardData: { cardA, cardB, timestamp }
 *  - tradeKey: string (unique key/timestamp)
 *  - setSavedTrades: function to update parent state
 */

const StyledCard = styled.div`
  display: flex;
  position: relative;
  justify-content: space-around;

  padding: 2rem 3rem;
  margin: 2rem;

  font-family: inherit;
  font-weight: 700;
  color: ${theme.colors.text};
  
  transition: 0.2s all ease;
  background-color: ${theme.colors.card};

  &:hover{
    background-color: ${theme.colors.card};
  }
  
`
const CardHeader = styled.h2`
  border-bottom: 1px solid ${theme.colors.text};
  padding-bottom: 0.5rem;
`

const TradeDetails = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 50%;
`
const TradeInfoSummary = styled.div`
  display: flex;
  flex-direction: column;

`
const TradeSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

`
const DeleteIcon = styled(CircleMinus)`
  position: absolute;
  top: 1rem;
  right: 1rem;

  border-radius: 99px;
  padding: 0.5px;


  color: ${theme.colors.error};
  transition: 0.2s all ease;

  cursor: pointer;

  &: hover {
    background-color: black;
  }
`



const SavedCard = ({ children, cardData, tradeKey, setSavedTrades, ...props }) => {

  // Remove this trade from localStorage and have parent to update its state
  const handleDeleteSavedTrade = () => {
    const savedTradesArr = JSON.parse(localStorage.getItem('savedTrades')) || []
    const filtered = savedTradesArr.filter(t => t.timestamp !== tradeKey)
    localStorage.setItem('savedTrades', JSON.stringify(filtered))
    setSavedTrades(filtered)
  }

  return (
    <StyledCard {...props}>
      <DeleteIcon
        onClick={handleDeleteSavedTrade}
      />
      <TradeDetails>
        <TradeInfoSummary>
          <CardHeader>
            <TradeElement editable={false}>
              <div>{cardData.cardA.team} Receive</div>
              <div>{cardData.cardA.total_value}</div>
            </TradeElement>
          </CardHeader>
          {cardData.cardA.picks.map((trade) => (
            <TradeElement key={trade.id} editable={false}>
              <div>{trade.year} ROUND {trade.round} PICK {trade.pick}</div>
              <div>{trade.pick_val}</div>
            </TradeElement>
          ))}

        </TradeInfoSummary>
        <TradeInfoSummary>
          <CardHeader>
            <TradeElement editable={false}>
              <div>{cardData.cardB.team} Receive</div>
              <div>{cardData.cardB.total_value}</div>
            </TradeElement>
          </CardHeader>
          {cardData.cardB.picks.map((trade) => (
            <TradeElement key={trade.id} editable={false}>
              <div>{trade.year} ROUND {trade.round} PICK {trade.pick}</div>
              <div>{trade.pick_val}</div>
            </TradeElement>
          ))}


        </TradeInfoSummary>

      </TradeDetails>
      <TradeSummary>
        <div>Favors</div>
        {/* Team A is favored */}
        {cardData.cardA.total_value > cardData.cardB.total_value && 
          <>
            <h2>{cardData.cardA.team}</h2>
            <div>by {cardData.cardA.total_value - cardData.cardB.total_value } points</div>
          </>

        }
        {/* Team B is favored */}
        {cardData.cardA.total_value < cardData.cardB.total_value && 
          <div>{cardData.cardB.team}</div>
        }
        {/* Neither Team is favored */}
        {cardData.cardA.total_value === cardData.cardB.total_value && 
          <div>neither team.</div>
        }
      </TradeSummary>

      
    </StyledCard>
  )
}

export default SavedCard