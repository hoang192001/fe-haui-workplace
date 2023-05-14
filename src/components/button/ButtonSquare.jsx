/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const ButtonSquare = ({ background = 'var(--color-white)', width = 'max-content', color, ...props }) => {
  return (
    <button css={cssButtonSquare(background, width)} {...props}>
      {props.children}
    </button>
  )
}

export default ButtonSquare

const cssButtonSquare = (background, width) => css`
  outline: none;
  border: 1px solid var(--color-menu-main);
  padding: 10px 16px;
  background: ${background};
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  font-size: 16px;
  color: var(--color-blue-blur);
  font-weight: 700;
  width: ${width};

  &:hover {
    background: var(--color-active-message);
  }
`
