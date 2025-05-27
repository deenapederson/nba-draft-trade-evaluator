import styled from 'styled-components'
import theme from '../styles/theme'
import { CircleMinus, Edit } from 'lucide-react'

/**
 * TradeElement Component
 *
 * A UI row element representing an individual trade pick.
 * Used inside a trade card to display year/round/pick data.
 *
 * Props:
 * - children: content inside the trade element (e.g., year, round, pick, value)
 * - onDelete: function to handle deletion when the delete icon is clicked
 * - id: optional string identifier for the DOM
 * - editable: boolean to toggle delete icon visibility (default true)
 */

const StyledTradeElement = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 0.5rem;

`
const TradeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.card};
  color: ${theme.colors.text}; 
  flex: 1;
  
`
const DeleteIcon = styled(CircleMinus)`
  border-radius: 99px;
  padding: 0.5px;


  color: ${theme.colors.error};
  transition: 0.2s all ease;

  cursor: pointer;

  &: hover {
    background-color: black;
  }
`



const TradeElement = ({ children, onDelete, id = '', editable = true, ...props }) => {
  return (
    <StyledTradeElement id={id} {...props}>
      <TradeInfo>
        {children}
      </TradeInfo>

      {editable && 
        <DeleteIcon
          onClick={onDelete}
        />
      }

      
    </StyledTradeElement>
  )
}

export default TradeElement