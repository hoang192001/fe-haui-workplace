/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { Fragment } from 'react'

// eslint-disable-next-line react/display-name
const Input = React.forwardRef(
  ({
    value,
    readOnly = false,
    onChange,
    placeholder = '',
    type = 'text',
    isIcon = false,
    iconLeft,
    className = '',
    maxLength,
    ...props
  }, ref) => (
    <div className={className} ref={ref}>
      <div css={cssInputCompo}>
        <div className="icon flex items-center">{iconLeft}</div>
        <input
          type={type}
          value={value}
          css={cssInput(props?.errors[props?.name])}
          placeholder={placeholder}
          onChange={onChange}
          readOnly={readOnly}
          maxLength={maxLength || 25}
          {...props}
        />
      </div>
      {props?.errors[props?.name] && (
        <span className="text-[14px] text-red-500">{props?.errors[props?.name]?.message}</span>
      )}
    </div>
  ),
)

const cssInputCompo = css`
  display: flex;
  position: relative;

  .icon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 10;
  }
`

const cssInput = (isError) => css`
  font-size: 16px;
  height: 48px;
  padding: 1px 2px 1px 46px;
  outline: none;
  border: none;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(231, 231, 231);
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;

  ${isError && 'border: 1px solid var(--color-danger);'}

  &:hover {
    border: 1px solid var(--color-blue-blur);
  }

  &:focus {
    ${isError ? 'border: 1px solid var(--color-danger);' : 'border: 1px solid var(--color-blue);'}
  }
`

export default Input
