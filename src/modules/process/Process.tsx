import Spinner from '@/assets/pulse.svg';

import {
  ContainerProps,
  StyledProcessContainer,
  StyledSpinner,
} from './styledProcess';

type Props = {
  isShown?: boolean;
  styles?: React.CSSProperties;
  size?: 'm' | 's';
} & ContainerProps;

const Process: React.FC<Props> = ({
  isShown,
  styles,
  isBordered,
  size = 'm',
}) => {
  const wrapperStyles = styles || {};

  if (!isShown) {
    return (
      <StyledProcessContainer
        isBordered={isBordered}
        style={{ ...wrapperStyles }}
      >
        <StyledSpinner size={size}>
          <Spinner />
        </StyledSpinner>
      </StyledProcessContainer>
    );
  }

  return isShown === true ? (
    <StyledProcessContainer
      isBordered={isBordered}
      style={{ ...wrapperStyles }}
    >
      <StyledSpinner size={size}>
        <Spinner />
      </StyledSpinner>
    </StyledProcessContainer>
  ) : null;
};

export { Process };
