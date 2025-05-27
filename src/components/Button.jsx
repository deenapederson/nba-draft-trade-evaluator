import styled from 'styled-components'
import theme from '../styles/theme'

/**
 * Button Component
 *
 * Renders button with themed color/typography
 *
 * Props:
 *  - children: content to display in button
 *  - onClick: onClick handler passed from parent
 *  - props: any additional props to pass directly in
 */

const StyledButton = styled.button`
  padding: 10px 20px;
  border: 1.5px solid ${theme.colors.text};
  border-radius: 8px;

  font-family: inherit;
  font-weight: 700;
  color: ${theme.colors.text};

  background-color: ${theme.colors.background};
  transition: 0.2s all ease;

  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.card};
  }
`

const Button = ({ children, onClick, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
