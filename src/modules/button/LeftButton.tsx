// @ts-ignore
import leftShevron from '@/assets/backward_shevron.svg?url';
import ImageModule from '../image/Image';
import styled from 'styled-components';

import { StyledButtonWidthIcon } from './Button';
import type { TButtonDataTypes } from 'styled-components';
import type { ImageModuleProps } from '../image/Image';

const StyledLeftButton = styled(StyledButtonWidthIcon)`
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

type LeftButtonProps = {
  iconProps?: {} & Partial<ImageModuleProps>;
  attrs?: {} & TButtonDataTypes &
    Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  styles?: React.CSSProperties;
};

const LeftButton: React.FC<LeftButtonProps> = ({
  attrs,
  styles,
  iconProps,
}) => {
  return (
    <StyledLeftButton style={{ ...styles }} {...attrs}>
      <ImageModule
        src={leftShevron}
        alt="left"
        draggable={false}
        {...iconProps}
      />
    </StyledLeftButton>
  );
};

export default LeftButton;
