import ClipBoardButton from '@/modules/button/ClipBoardButton';

import { DEFAULT_ADD_BOARD_BUTTON_COLORS } from '@/utils/constants';
import { ChangeEvent, Children, SyntheticEvent } from 'react';

type DefaultColorPickerButtonsProps = {
  changeHandlerClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

const DefaultColorPickerButtons: React.FC<DefaultColorPickerButtonsProps> = ({
  changeHandlerClick,
  changeHandler,
}) => {
  return (
    <ul className="color-picker">
      {Children.toArray(
        DEFAULT_ADD_BOARD_BUTTON_COLORS.map((color) => {
          const { backgroundColor } = color;
          return (
            <li>
              <button
                className="color-picker__el card_design"
                style={{ backgroundColor: backgroundColor }}
                onClick={changeHandlerClick}
                value={backgroundColor}
                name="bg"
              ></button>
            </li>
          );
        }),
      )}
      <li>
        <ClipBoardButton click={changeHandlerClick} buttonName="link" />
      </li>
      <li>
        <input
          className="color-picker__el card_design"
          name="bg"
          type="color"
          style={{
            height: '32px',
            width: '32px',
            padding: '11px',
            backgroundColor: '#ffffffb0',
          }}
          onChange={changeHandler}
        />
      </li>
    </ul>
  );
};

export default DefaultColorPickerButtons;
