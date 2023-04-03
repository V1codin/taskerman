// @ts-ignore
import deleteIco from '@/assets/plus.svg?url';
import styled from 'styled-components';
import ImageModule from '../image/Image';

import type { TButtonDataTypes } from 'styled-components';
import type { ImageModuleProps } from '../image/Image';

type CloseBtnProps = {
  iconProps?: {} & Partial<ImageModuleProps>;
  attrs?: {} & TButtonDataTypes &
    Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  styles?: React.CSSProperties;
};

const StyledCloseBtn = styled.button<{ style: React.CSSProperties }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  min-width: auto;
  min-height: auto;

  top: 10px;
  right: 10px;

  &:hover {
    transform: scale(1.09);
    box-shadow: none;
    border-radius: 7px;
  }
  &:active {
    background-color: var(--aqua-active);
  }

  &:hover img {
    transform: rotate(45deg) scale(1.1);
  }

  & img {
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
  }
`;

const CloseBtn: React.FC<CloseBtnProps> = ({
  iconProps = {},
  styles = {},
  attrs = {},
}) => {
  return (
    <StyledCloseBtn style={{ ...styles }} {...attrs}>
      <ImageModule
        src={deleteIco}
        alt="delete"
        draggable={false}
        {...iconProps}
      />
    </StyledCloseBtn>
  );
};
export default CloseBtn;
