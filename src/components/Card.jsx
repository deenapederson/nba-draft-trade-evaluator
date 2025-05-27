import styled from 'styled-components'
import theme from '../styles/theme'
import { useState, useEffect } from 'react'
import { CirclePlus  } from 'lucide-react'
import TradeElement from './TradeElement'
import Select from './Select'
import { YEARS, NBA_TEAMS, DRAFT_PICKS, PICK_VALUE_CHART } from '../constants/options'

/**
 * Card Component
 *
 * A styled card component for creating and displaying potential draft pick trades
 * Allows users to select a team, add draft picks, and analyze total trade value
 * Displays all appended picks with the ability to delete them
 * All draft picks must have a year, round, and pick to be created
 *
 * Props:
 * - cardData (object): {
 *     team: string,
 *     picks: array of { year, round, pick, pick_val, id },
 *     total_value: number
 *   }
 * - setCardData (function): Updates card state in the parent component
 * - otherSelectedTeam (string): Used to prevent selecting the same team trading to itself
 * - children (node): any components/content
 * - ...props: Additional props passed to the root styled card element
 */

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  min-width: 500px;

  padding: 2rem 3rem;
  margin: 2rem;

  font-family: inherit;
  font-weight: 700;
  color: ${theme.colors.text};
  
  background-color: ${theme.colors.card};
  transition: 0.2s all ease;

  &:hover{
    background-color: ${theme.colors.card};
  }
  
`
const CardHeader = styled.h2`
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${theme.colors.text};
`

const CreateTradeSelectionBar = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.5rem 1rem;

  background-color: black;
  color: ${theme.colors.text};
`

const CardTotal = styled.div`
  border-top: 1px solid ${theme.colors.text};
`

const WarningMessage = styled.div`
  font-size: 14px;
  color: ${theme.colors.error};
`

const SelectTitle = styled(Select)`
  font-size: 28px;
  background-color: ${theme.colors.card};
`

const AddIcon = styled(CirclePlus)`
  padding: 0.5px;  
  border-radius: 99px;

  transition: 0.2s all ease;

  cursor: pointer;

  &: hover {
    background-color: black;
  }
`

const Card = ({ children, cardData, setCardData, otherSelectedTeam, ...props }) => {
  const [newTrade, setNewTrade] = useState({
    year: 'year-default',
    round: 'round-default',
    pick: 'pick-default'
  })
  const { team, picks, total_value } = cardData
  const [warningMessage, setWarningMessage] = useState(null)
  


  const handleDeleteTradeElementById = (id, val) => {
    const updatedTrades = picks.filter((trade) => trade.id !== id)
    setCardData({...cardData, picks: updatedTrades})
  }

  const handleCreateTradeElement = () => {
    // Prevent creation if user hasn't selected all fields
    if (newTrade.year === 'year-default' || newTrade.round === 'round-default' || newTrade.pick === 'pick-default'){
      setWarningMessage('Please Select Year, Round, and Pick to continue.')
      return
    }

    // Construct new trade element and add to state
    const newElement = {
      year: newTrade.year,
      round: newTrade.round,
      pick: newTrade.pick,
      pick_val: PICK_VALUE_CHART[newTrade.pick],
      id: Date.now(),
    }

    const updatedTrades = [...picks, newElement]

    setCardData({...cardData, picks: updatedTrades})
    setWarningMessage(null)

    setNewTrade({
        year: 'year-default',
        round: 'round-default',
        pick: 'pick-default'
      })
  }

  useEffect(() => {
    // Recalculate total value when picks change
    const total = picks.reduce((acc, trade) => acc + trade.pick_val, 0)
    setCardData({...cardData, total_value: total})
  }, [picks])

  return (
    <StyledCard {...props}>
      <CardHeader>
        <SelectTitle
          id='select-team'
            value={team}
            onChange={(e) => {
              const team = e.target.value
              setCardData({...cardData, team: team})
              setWarningMessage(null)
            }}
        >
          <option key='team-default'>Select Team</option>
          {NBA_TEAMS
          .filter((team) => team !== otherSelectedTeam).map((team) => 
              <option key={`team-${team}`} value={team}>{team} Recieve</option>
            )}

        </SelectTitle>
      </CardHeader>

      {/* Select Year, Round, and Pick to add trade elements */}
      <CreateTradeSelectionBar>
        <Select 
          id='select-year'
          value={newTrade.year}
          onChange={(e) => {
            const value = e.target.value
            setNewTrade({
              ...newTrade,
              year: value,
            })
            setWarningMessage(null)
          }}
        >
          <option key='year-default'>YEAR</option>

          {YEARS.map((year) => 
            <option key={`year-${year}`} value={year}>YEAR {year}</option>
          )}
          
        </Select>
        <Select 
          id='select-round'
          value={newTrade.round}
          onChange={(e) => {
            const value = e.target.value
            setNewTrade({
              ...newTrade,
              round: value,
            })
            setWarningMessage(null)
          }}
        >
          <option key='round-default'>ROUND</option>
          <option key='round-1' value={1}>ROUND 1</option>
          <option key='round-2' value={2}>ROUND 2</option>
        </Select>
        <Select 
          id='select-pick'
          value={newTrade.pick}
          onChange={(e) => {
            const value = e.target.value
            setNewTrade({
              ...newTrade,
              pick: value,
            })
            setWarningMessage(null)
          }}
        >
          <option key='pick-default'>PICK</option>
          
          {DRAFT_PICKS
            .filter((pick) => {
              if (newTrade.round === '1'){
                return pick >= 1 && pick <= 30
              }
              if (newTrade.round === '2'){
                return pick >=31 && pick <= 60
              }
              return true

            })
            .map((pick) =>
              <option key={`pick-${pick}`} value={pick}> 
                PICK {pick}
              </option>
          )}

        </Select>
        <AddIcon 
          onClick={handleCreateTradeElement}
        />
      </CreateTradeSelectionBar>
      {warningMessage && 
        <WarningMessage>{warningMessage}</WarningMessage>
      }
        
      <div style={{flexGrow: '1'}}>
        {picks.map((trade) => (
          <TradeElement 
            id={trade.id} 
            onDelete={() => handleDeleteTradeElementById(trade.id, trade.pick_val)}
          >
            <div>{trade.year} ROUND {trade.round} PICK {trade.pick}</div>
            <div>{trade.pick_val}</div>
            
          </TradeElement>
        ))}
      </div>

      {/* Display Total Value of proposed trade based on the value of all elements */}
      <CardTotal>
        <TradeElement editable={false} >
          <div>TOTAL VALUE</div>
          <div>{total_value}</div>
        </TradeElement>
      </CardTotal>
    </StyledCard>
  )
}

export default Card