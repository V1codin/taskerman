// @ts-ignore
import deleteIco from '@/assets/plus.svg?url';
import ImageModule from '../image/Image';

import { StyledDropDown } from './styledDropDown';
import { useEscapeCallback } from '@/hooks/hooks';
import { MouseEvent, SyntheticEvent } from 'react';

type DropDownProps = {
  heading?: string;
  close: <
    T extends KeyboardEvent | MouseEvent | SyntheticEvent<HTMLButtonElement>,
  >(
    e: T,
  ) => void;
  children?: React.ReactNode;
  dropDownType?: string;
};

const DropDown: React.FC<DropDownProps> = ({
  heading,
  close,
  children,
  dropDownType,
}) => {
  useEscapeCallback(close);

  return (
    <StyledDropDown className="colored">
      <header className="popup__header">
        <h4 className="popup__article unselectable">{heading || 'List'}</h4>
        <button
          className="close__btn"
          onClick={close}
          data-drop-type={dropDownType || ''}
        >
          <ImageModule
            src={deleteIco}
            alt="close"
            className="menu__ico close__btn__ico"
            title="Close the dropdown"
            draggable={false}
          />
        </button>
      </header>
      {children && <ul className="popup__body body_shape">{children}</ul>}
    </StyledDropDown>
  );
};
export default DropDown;
