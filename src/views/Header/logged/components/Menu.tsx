// @ts-ignore
import Plus from '@/assets/plus.svg?url';
// @ts-ignore
import Info from '@/assets/info.svg?url';
// @ts-ignore
import Note from '@/assets/notification.svg?url';
import ImageModule from '@/modules/image/Image';
import Account from './Account';
import AddBoardDropDown from './dropdownBodies/AddBoardDropDown';
import AccountDropDown from './dropdownBodies/AccountDropDown';
import InfoBoardDropDownProps from './dropdownBodies/InfoBoardDropDown';

import { SessionUser } from '../../../../../types/db';
import {
  useState,
  SyntheticEvent,
  MouseEvent as IMouseEvent,
  MutableRefObject,
} from 'react';
import { useOuterCLick } from '@/hooks/hooks';
import { TMenuModalNames } from '../../../../../types/state';
import { getSetModal } from '@/context/stateManager';
import { useAtom } from 'jotai';

type MenuProps = {
  user: SessionUser;
  logout: () => void;
  containerRef: MutableRefObject<HTMLElement | null>;
};
type DropState = {
  add: boolean;
  info: boolean;
  note: boolean;
  account: boolean;
};

const Menu: React.FC<MenuProps> = ({ user, logout, containerRef }) => {
  const defaultDropState: DropState = {
    add: false,
    info: false,
    note: false,
    account: false,
  };
  const [dropState, setDropState] = useState<DropState>(defaultDropState);
  const [, setAuthState] = useAtom(getSetModal);

  const closeAllDropDowns = () => {
    setDropState(defaultDropState);
  };

  useOuterCLick(containerRef, () => {
    closeAllDropDowns();
  });

  const notifications = [];

  const toggleDropDown = (
    e: KeyboardEvent | IMouseEvent | SyntheticEvent<HTMLButtonElement>,
  ) => {
    const event = e as SyntheticEvent<HTMLButtonElement>;
    const dropType = event.currentTarget?.dataset['dropType'] || '';
    if (dropType) {
      setDropState((prev) => {
        return {
          ...defaultDropState,
          [dropType]: !prev[dropType as keyof DropState],
        };
      });
    }
  };

  const closeDropDown = (
    e: KeyboardEvent | IMouseEvent | SyntheticEvent<HTMLButtonElement>,
  ) => {
    if (!(e instanceof KeyboardEvent)) {
      const event = e as SyntheticEvent<HTMLButtonElement>;
      const dropType = event.currentTarget?.dataset['dropType'] || '';
      if (dropType) {
        setDropState((prev) => {
          return {
            ...prev,
            [dropType]: false,
          };
        });

        return;
      }
    }

    // ? if pressed keyboard's key (if esc the window will be closed)
    closeAllDropDowns();
  };

  const openModal = (modalName: TMenuModalNames) => {
    return () => {
      closeAllDropDowns();
      setAuthState({
        isOpen: true,
        window: {
          type: 'create',
          view: modalName,
        },
      });
    };
  };

  return (
    <>
      <button
        data-drop-type="add"
        className={`menu__btn${dropState.add ? ' active' : ''}`}
        name="add"
        title="Create"
        onClick={toggleDropDown}
      >
        <ImageModule src={Plus} alt="add" className="menu__ico" />
      </button>
      {dropState.add && (
        <AddBoardDropDown openModal={openModal} closeDropDown={closeDropDown} />
      )}
      <button
        className={`menu__btn${dropState.info ? ' active' : ''}`}
        name="info"
        title="Information"
        data-drop-type="info"
        onClick={toggleDropDown}
      >
        <ImageModule src={Info} alt="info" className="menu__ico" />
      </button>
      {dropState.info && (
        <InfoBoardDropDownProps closeDropDown={closeDropDown} />
      )}
      <button
        className={`menu__btn${dropState.note ? ' active' : ''}`}
        name="note"
        title="Notifications"
      >
        {notifications.length > 0 && (
          <div className="badges">
            {notifications.length >= 99 ? 99 : notifications.length}
          </div>
        )}
        <ImageModule src={Note} alt="notification" className="menu__ico" />
      </button>
      {/* 
      {dropState.note && (
        <NoteBoardDrop
          toggle={() => setState({ ...defState, note: !state.note })}
          notes={notifications}
          userId={userId}
        />
      )}
      */}
      <Account
        imageURL={user.imageURL}
        username={user.username}
        displayName={user.displayName}
        onToggle={toggleDropDown}
      />
      {dropState.account && (
        <AccountDropDown closeDropDown={closeDropDown} logoutHandler={logout} />
      )}
    </>
  );
};
export default Menu;
