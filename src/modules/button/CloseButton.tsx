// @ts-ignore
import deleteIco from '@/assets/plus.svg?url';
import styled from 'styled-components';
import ImageModule from '../image/Image';

import type { TButtonDataTypes } from 'styled-components';
import type { ImageModuleProps } from '../image/Image';
import { StyledButtonWidthIcon } from './Button';

type CloseButtonProps = {
  iconProps?: {} & Partial<ImageModuleProps>;
  attrs?: {} & TButtonDataTypes &
    Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  styles?: React.CSSProperties;
};

const StyledCloseButton = styled(StyledButtonWidthIcon)`
  & img {
    transform: rotate(45deg);
  }

  &:hover img {
    transform: rotate(45deg);
  }
`;

const CloseButton: React.FC<CloseButtonProps> = ({
  iconProps = {},
  styles = {},
  attrs = {},
}) => {
  return (
    <StyledCloseButton style={{ ...styles }} {...attrs}>
      <ImageModule
        src={deleteIco}
        alt="delete"
        draggable={false}
        {...iconProps}
      />
    </StyledCloseButton>
  );
};

export default CloseButton;
