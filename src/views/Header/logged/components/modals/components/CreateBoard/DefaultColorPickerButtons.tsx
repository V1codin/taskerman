import ImageModule from '@/modules/image/Image';
// @ts-ignore
import link from '@/assets/link.svg?url';

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
        <button
          className="menu__btn card_design menu_linkBg"
          onClick={changeHandlerClick}
          name="link"
        >
          <ImageModule
            src={link}
            alt="link bg"
            className="menu__ico"
            title="Get link of the background from clipboard"
          />
        </button>
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
            marginTop: '12px',
          }}
          onChange={changeHandler}
        />
      </li>
    </ul>
  );
};
export default DefaultColorPickerButtons;
