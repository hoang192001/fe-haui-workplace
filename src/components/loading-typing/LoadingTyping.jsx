/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

const LoadingTyping = () => {
  return <span css={cssLoading}></span>
}

export default LoadingTyping

const cssLoading = css`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  color: var(--color-gray-rain);
  box-sizing: border-box;
  animation: animloader 1s linear infinite alternate;

  @keyframes animloader {
    0% {
      box-shadow: -38px -12px, -14px 0, 14px 0, 38px 0;
    }
    33% {
      box-shadow: -38px 0px, -14px -12px, 14px 0, 38px 0;
    }
    66% {
      box-shadow: -38px 0px, -14px 0, 14px -12px, 38px 0;
    }
    100% {
      box-shadow: -38px 0, -14px 0, 14px 0, 38px -12px;
    }
  }
`
