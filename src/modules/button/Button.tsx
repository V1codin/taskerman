import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  children?: JSX.Element | JSX.Element[] | React.ReactNode;
  attrs?: Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  styles?: React.CSSProperties;
};

const StyledButton = styled.button<{ style: React.CSSProperties }>`
  justify-content: center;
  text-align: center;
  min-width: 70px;
  min-height: 44px;
  background-color: var(--black-aqua);
  box-shadow: 0 0 5px var(--yellow);
  transition: 0.2s ease;

  cursor: pointer;
  background-color: unset;
  border: 1px solid transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  animation: fadeIn 1s;
  animation-fill-mode: forwards;

  .btn_small {
    width: 55px;
    height: 35px;
  }

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
