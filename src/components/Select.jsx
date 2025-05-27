import styled from 'styled-components'
import theme from '../styles/theme'

/**
 * Select Component
 *
 * A styled select for the to be used throughout the app
 *
 * Props:
 * - children (node): any components/content passed in
 * - ...props: Additional props passed
 */

const StyledSelect = styled.select`
  border: none;
  font-family: inherit;
  font-weight: 700;
  font-size: 18px;
  color: ${theme.colors.text}; 

  background-color: black;

  &:focus {
    outline: none;
  }
`


const Select = ({ children, ...props }) => {
  return (
    <StyledSelect {...props}>
      {children}
    </StyledSelect>
  )
}

export default Select
