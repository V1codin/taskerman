import React from 'react';
import styled from 'styled-components';

import { memo } from 'react';
import { ToastComponentProps } from '../../../types/helpers';

const StyledContainer = styled.div`
  position: absolute;
  width: inherit;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 8000;

  width: fit-content;

  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  margin: 20px auto 0;
  padding: 15px;
  border-radius: 7px;

  animation: fadeIn 1.5s;
  animation-fill-mode: forwards;

  text-align: center;
  background-color: var(--black-aqua_op);
  box-shadow: 0 0 5px var(--pink);
`;

const Toast: React.FC<ToastComponentProps> = memo(({ message, typeClass }) => {
  return (
    <StyledContainer className={typeClass || 'conflict'}>
      <h4>{message}</h4>
    </StyledContainer>
  );
});

Toast.displayName = 'Toast';

export default Toast;
