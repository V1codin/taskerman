// @ts-ignore
import Plus from '@/assets/plus.svg?url';
// @ts-ignore
import Info from '@/assets/info.svg?url';
// @ts-ignore
import Note from '@/assets/notification.svg?url';
import ImageModule from '@/modules/image/Image';
import DropDown from '@/modules/dropdown/DropDown';

import { useState, SyntheticEvent, MouseEvent } from 'react';

type MenuProps = {};
type DropState = {
  add: boolean;
  info: boolean;
  note: boolean;
};

const Menu: React.FC<MenuProps> = () => {
  const defaultDropState: DropState = {
    add: false,
    info: false,
    note: false,
  };
  const [dropState, setDropState] = useState<DropState>(defaultDropState);
  const notifications = [];

  const openDropDown = (e: SyntheticEvent<HTMLButtonElement>) => {
    const dropType = e.currentTarget.dataset['dropType'] || '';
    if (!dropType) {
      setDropState(defaultDropState);

      return;
    }

    const type = dropType as keyof DropState;

    setDropState((prev) => {
      return {
        ...prev,
        [type]: !prev[type],
      };
    });
  };

  const closeDropDown = (
    e: KeyboardEvent | MouseEvent | SyntheticEvent<HTMLButtonElement>,
  ) => {
    if ('currentTarget' in e) {
      console.log('check');
      const event = e as SyntheticEvent<HTMLButtonElement>;
      const dropType = event.currentTarget?.dataset['dropType'] || '';
      if (dropType) {
        setDropState((prev) => {
          return {
            ...prev,
            [dropType]: !prev[dropType as keyof DropState],
          };
        });

        return;
      }

      setDropState(defaultDropState);
    }
  };
  return (
    <>
      <button
        data-drop-type="add"
        className="menu__btn"
        name="add"
        title="Create"
        onClick={openDropDown}
      >
        <ImageModule src={Plus} alt="add" className="menu__ico" />
      </button>
      {dropState.add && (
        <DropDown close={closeDropDown} heading="Create" dropDownType="add">
          <p>ALLO</p>
        </DropDown>
        // <AddBoardDrop
        //   toggle={() => setState({ ...defState, add: !state.add })}
        //   initBoardCreationForm={initBoardCreationForm}
        // />
      )}
      <button className="menu__btn" name="info" title="Information">
        <ImageModule src={Info} alt="info" className="menu__ico" />
      </button>
      {/*
      {state.info && (
        <InfoBoardDrop
          toggle={() => setState({ ...defState, info: !state.info })}
        />
      )}
      */}
      <button className="menu__btn" name="note" title="Notifications">
        {notifications.length > 0 && (
          <div className="badges">
            {notifications.length >= 99 ? 99 : notifications.length}
          </div>
        )}
        <ImageModule src={Note} alt="notification" className="menu__ico" />
      </button>
      {/* 
      {state.note && (
        <NoteBoardDrop
          toggle={() => setState({ ...defState, note: !state.note })}
          notes={notifications}
          userId={userId}
        />
      )}
      */}
    </>
  );
};
export default Menu;
