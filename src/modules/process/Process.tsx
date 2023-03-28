import Loader from '@/assets/pulse.svg';

import {
  ContainerProps,
  StyledProcessContainer,
  StyledSpinner,
} from './styledProcess';

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
