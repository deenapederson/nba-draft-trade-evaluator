import styled from 'styled-components'
import theme from '../styles/theme'

/**
 * Footer Component
 *
 * A styled component for the footer
 *
 * Props:
 * - children (node): any components/content passed in
 * - ...props: Additional props passed
 */

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  grid-column: 1 / -1;

  padding: 1rem 2rem;

  font-weight: 700;
  font-size: 20px;
  color: ${theme.colors.text};

  background-color: ${theme.colors.background};
`

const Footer = ({ children, ...props }) => {
  return (
    <StyledFooter {...props}>
      {children}
    </StyledFooter>
  )
}

export default Footer