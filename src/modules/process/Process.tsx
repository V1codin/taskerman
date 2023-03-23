import React from 'react';
import styled from 'styled-components';

import Loader from '@/assets/pulse.svg';

type ContainerProps = {
  isBordered?: boolean;
  width?: string;
  height?: string;
};

const StyledProcessContainer = styled.div<React.CSSProperties & ContainerProps>`
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;
  border: ${({ isBordered }) =>
    isBordered ? '1px solid var(--pale-green)' : '1px solid transparent'};

  border-radius: 50%;
  width: ${({ width }) => width || '50px'};
  height: ${({ height }) => height || 'inherit'};

  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);

  .wrapper_centered {
    margin: 10% auto;
  }

  & svg {
    stroke-width: 20px;
    stroke-dashoffset: 1645;
    stroke-dasharray: 1645;

    /* stroke: var(--pale-green); */
    stroke: var(--pink);
    animation: follow 1s ease-in-out infinite;
  }

  @keyframes follow {
    0% {
      stroke-dasharray: 1645;
    }
    10% {
      stroke-dasharray: 1919;
    }
    100% {
      stroke-dasharray: 3730;
    }
  }
`;

const StyledSpinner = styled.div`
  width: 130px;
`;

type Props = {
  isShown?: boolean;
  styles?: React.CSSProperties;
} & ContainerProps;

const Process: React.FC<Props> = ({ isShown, styles, isBordered }) => {
  const wrapperStyles = styles || {};

  if (!isShown) {
    return (
      <StyledProcessContainer
        isBordered={isBordered}
        style={{ ...wrapperStyles }}
      >
        <StyledSpinner>
          <Loader />
        </StyledSpinner>
      </StyledProcessContainer>
    );
  }

  return isShown === true ? (
    <StyledProcessContainer
      isBordered={isBordered}
      style={{ ...wrapperStyles }}
    >
      <StyledSpinner>
        <Loader />
      </StyledSpinner>
    </StyledProcessContainer>
  ) : null;
};

export { Process };
