// @ts-ignore
import rightShevron from '@/assets/forward_shevron.svg?url';
import ImageModule from '../image/Image';
import styled from 'styled-components';

import { StyledButtonWidthIcon } from './Button';
import type { TButtonDataTypes } from 'styled-components';
import type { ImageModuleProps } from '../image/Image';

const StyledRightButton = styled(StyledButtonWidthIcon)`
  & img {
    width: 25px;
    height: 25px;
  }

  &:hover {
    box-shadow: 0 0 15px var(--blue);
  }

  &:active {
    border: 1px solid var(--pale-blue);
    background-color: var(--aqua-active);
    box-shadow: none;
  }
`;

type RightButtonProps = {
  iconProps?: {} & Partial<ImageModuleProps>;
  attrs?: {} & TButtonDataTypes &
    Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  styles?: React.CSSProperties;
};

const RightButton: React.FC<RightButtonProps> = ({
  attrs,
  styles,
  iconProps,
}) => {
  return (
    <StyledRightButton style={{ ...styles }} {...attrs}>
      <ImageModule
        src={rightShevron}
        alt="right"
        draggable={false}
        {...iconProps}
      />
    </StyledRightButton>
  );
};

export default RightButton;
