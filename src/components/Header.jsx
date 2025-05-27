import styled from 'styled-components'
import theme from '../styles/theme'

/**
 * Header Component
 *
 * A styled component for the footer
 *
 * Props:
 * - children (node): any components/content passed in
 * - ...props: Additional props passed
 */

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: 1 / -1;

  padding: 1rem 2rem;
  
  border-bottom: 1.5px solid ${theme.colors.text};
  font-weight: 700;
  color: ${theme.colors.text};

  background-color: ${theme.colors.card};

  &:hover{
    background-color: ${theme.colors.card};
  }
  
`

const Header = ({ children, ...props }) => {
  return (
    <StyledHeader {...props}>
      {children}
    </StyledHeader>
  )
}

export default Header