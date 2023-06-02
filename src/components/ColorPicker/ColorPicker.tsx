import ClipBoardButton from '@/modules/button/ClipBoardButton';
import cls from 'classnames';

import { DEFAULT_ADD_BOARD_BUTTON_COLORS } from '@/utils/constants';
import { Children } from 'react';

import type { ChangeEvent, SyntheticEvent } from 'react';

const defaultContainerClassNames = `flex items-center w-full 
mt-2 justify-evenly space-x-2`;

const defaultInputClasses = `cursor-pointer p-4 border border-dashed 
border-transparent colored designed
active:shadow-none`;

type ColorPickerProps = {
  changeHandlerClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  changeHandlerClick,
  changeHandler,
}) => {
  return (
    <ul className={cls(defaultContainerClassNames)}>
      {Children.toArray(
        DEFAULT_ADD_BOARD_BUTTON_COLORS.map((color) => {
          const { backgroundColor, classes } = color;
          return (
            <li>
              <button
                className={classes}
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
          className={cls(
            defaultInputClasses,
            'h-[34px] w-[34px] !p-3 !bg-[#ffffffb0] hover:shadow-[0_0_5px_#42c5e4]',
          )}
          name="bg"
          type="color"
          onChange={changeHandler}
        />
      </li>
    </ul>
  );
};

export default ColorPicker;
