// @ts-ignore
import moreDots from '@/assets/more.svg?url';
import ImageModule from '../image/Image';
import styled from 'styled-components';

import { StyledButtonWidthIcon } from './Button';
import type { TButtonDataTypes } from 'styled-components';
import type { ImageModuleProps } from '../image/Image';

type EllipsisButtonProps = {
  iconProps?: {} & Partial<ImageModuleProps>;
  attrs?: {} & TButtonDataTypes &
    Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  styles?: React.CSSProperties;
};

const StyledEllipsisButton = styled(StyledButtonWidthIcon)`
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

const EllipsisButton: React.FC<EllipsisButtonProps> = ({
  attrs,
  styles,
  iconProps,
}) => {
  return (
    <StyledEllipsisButton style={{ ...styles }} {...attrs}>
      <ImageModule
        src={moreDots}
        alt="more menu"
        draggable={false}
        {...iconProps}
      />
    </StyledEllipsisButton>
  );
};

export default EllipsisButton;
