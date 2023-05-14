/* @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

export const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button css={cssButton} onClick={onClick} className={className} {...props}>
      {children}
    </button>
  );
};

const cssButton = css`
  background: var(--color-blue-blur);
  border-radius: 8px;
  color: var(--color-white);
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  padding: 10px 16px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background: var(--color-blue);
  }
`;
