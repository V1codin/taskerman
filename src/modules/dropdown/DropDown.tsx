// @ts-ignore
import deleteIco from '@/assets/plus.svg?url';
import CloseBtn from '../button/CloseBtn';

import { StyledDropDown } from './styledDropDown';
import { useEscapeCallback } from '@/hooks/hooks';
import { MouseEvent, SyntheticEvent } from 'react';
import { TDropDownMinWidth } from '@/types/helpers';

type DropDownProps = {
  heading?: string;
  close: <
    T extends KeyboardEvent | MouseEvent | SyntheticEvent<HTMLButtonElement>,
  >(
    e: T,
  ) => void;
  children?: React.ReactNode;
  dropDownType?: string;
  minWidth?: TDropDownMinWidth;
};

const DropDown: React.FC<DropDownProps> = ({
  heading,
  close,
  children,
  dropDownType,
  minWidth,
}) => {
  useEscapeCallback(close);

  return (
    <StyledDropDown className="colored" minWidth={minWidth}>
      <header className="popup__header">
        <h4 className="popup__article unselectable">{heading || 'List'}</h4>
        <CloseBtn
          attrs={{
            onClick: close,
            'data-drop-type': dropDownType || '',
          }}
        />
      </header>
      {children && <ul className="popup__body body_shape">{children}</ul>}
    </StyledDropDown>
  );
};

export default DropDown;
