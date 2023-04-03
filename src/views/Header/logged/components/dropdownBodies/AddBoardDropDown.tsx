import DropDown from '@/modules/dropdown/DropDown';

import { MouseEvent, MouseEventHandler, SyntheticEvent } from 'react';
import { TMenuCreateModalNames } from '@/types/state';

type AddBoardDropDownProps = {
  closeDropDown: (
    e: KeyboardEvent | MouseEvent | SyntheticEvent<HTMLButtonElement>,
  ) => void;
  openModal: (
    modalName: TMenuCreateModalNames,
  ) => MouseEventHandler<HTMLButtonElement>;
};

const AddBoardDropDown: React.FC<AddBoardDropDownProps> = ({
  closeDropDown,
  openModal,
}) => {
  return (
    <DropDown
      close={closeDropDown}
      heading="Create"
      dropDownType="add"
      minWidth="290px"
    >
      <li className="list__body_mt5">
        <button
          className="popup__body__el column text_start"
          onClick={openModal('create_board')}
        >
          <span className="el__span">Create a board</span>
          <p className="el__article">
            A board is made up of cards ordered on lists. Use it to manage
            projects, track information, or organize anything.
          </p>
        </button>
      </li>
      <li className="list__body_mt5">
        <button className="popup__body__el column text_start">
          <span className="el__span">Start with template</span>
          <p className="el__article">
            Get started faster with a board template.{' '}
            <span style={{ color: 'var(--pink)' }}>(not implemented)</span>
          </p>
        </button>
      </li>
      <li className="list__body_mt5">
        <button className="popup__body__el column text_start">
          <span className="el__span">Create a workspace</span>
          <p className="el__article">
            A Workspace is a group of boards and people. Use it to organize your
            company, side hustle, family, or friends.{' '}
            <span style={{ color: 'var(--pink)' }}>(not implemented)</span>
          </p>
        </button>
      </li>
    </DropDown>
  );
};
export default AddBoardDropDown;
