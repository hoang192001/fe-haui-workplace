/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const Spinner = () => {
  return <div css={loader}></div>
}

export default Spinner

const loader = css`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #fff;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin-left: auto;
  margin-right: auto;
  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-bottom: 4px solid var(--color-menu-main);
    border-left: 4px solid transparent;
  }
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
