import styled from 'styled-components';

export type ContainerProps = {
  isBordered?: boolean;
  width?: string;
  height?: string;
};

export const StyledProcessContainer = styled.div<
  React.CSSProperties & ContainerProps
>`
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;
  border: ${({ isBordered }) =>
    isBordered ? '1px solid var(--pale-green)' : '1px solid transparent'};

  border-radius: 50%;
  width: ${({ width }) => width || '55px'};
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

export const StyledSpinner = styled.div<{ size: 'm' | 's' }>`
  width: ${({ size }) =>
    size === 'm' ? '130px' : size === 's' ? '35px' : '130px'};
`;
