import { useContext } from 'react';
import { ParentRefContext } from '../../';

import { useOuterCLick } from '../../../../../hooks/hooks';

import { DropDown } from '../../../../../modules/dropdown';

import './DropDowns.css';

const PopupBody = (props) => {
  const { initBoardCreationForm } = props;
  return (
    <>
      <li className="list__body_mt5">
        <button className="popup__body__el" onClick={initBoardCreationForm}>
          <span className="el__span">Create a board</span>
          <p className="el__article">
            A board is made up of cards ordered on lists. Use it to manage
            projects, track information, or organize anything.
          </p>
        </button>
      </li>
      <li className="list__body_mt5">
        <button className="popup__body__el">
          <span className="el__span">Start with template</span>
          <p className="el__article">
            Get started faster with a board template.{' '}
            <span style={{ color: 'var(--pink)' }}>(not implemented)</span>
          </p>
        </button>
      </li>
      <li className="list__body_mt5">
        <button className="popup__body__el">
          <span className="el__span">Create a workspace</span>
          <p className="el__article">
            A Workspace is a group of boards and people. Use it to organize your
            company, side hustle, family, or friends.{' '}
            <span style={{ color: 'var(--pink)' }}>(not implemented)</span>
          </p>
        </button>
      </li>
    </>
  );
};

function AddBoardDrop(props) {
  const { toggle, initBoardCreationForm } = props;
  const parentRef = useContext(ParentRefContext);
  useOuterCLick(parentRef, toggle);

  const dropProps = {
    toggle,
    heading: 'Create',
    classList: ['add'],
    popupBody: PopupBody({ initBoardCreationForm })
  };

  return <DropDown {...dropProps} />;
}

export { AddBoardDrop };
