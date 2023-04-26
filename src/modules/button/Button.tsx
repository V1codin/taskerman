import styled from 'styled-components';

import type { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react';
import type { TButtonDataTypes } from 'styled-components';

export type CustomButtonAttrs = TButtonDataTypes &
  Partial<ButtonHTMLAttributes<HTMLButtonElement>>;

type ButtonProps = {
  children?: ReactNode;
  attrs?: {} & CustomButtonAttrs;
  styles?: CSSProperties;
};

export const StyledButtonWidthIcon = styled.button<{
  style: React.CSSProperties;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  min-width: auto;
  min-height: auto;

  top: 10px;
  right: 10px;

  &:hover {
    transform: scale(1.09);
    box-shadow: none;
    border-radius: 7px;
  }

  &:active {
    background-color: var(--aqua-active);
  }

  & img {
    width: 20px;
    height: 20px;
  }
`;

export const StyledButton = styled.button<{ style: React.CSSProperties }>`
  background-color: var(--black-aqua);
  box-shadow: 0 0 5px ${({ theme }) => theme.colors.yellow};
  transition: 0.2s ease;
  position: relative;

  cursor: pointer;
  border: 1px solid transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  animation: fadeIn 1s;
  animation-fill-mode: forwards;

  &:disabled {
    cursor: not-allowed;
    color: #ffffff49;
    background-color: #808080 !important;
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  styles = {},
  attrs = {},
}) => {
  return (
    <StyledButton style={{ ...styles }} {...attrs}>
      {children}
    </StyledButton>
  );
};

export default Button;
