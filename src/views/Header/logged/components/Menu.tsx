// @ts-ignore
import Info from '@/assets/info.svg?url';
// @ts-ignore
import Note from '@/assets/notification.svg?url';
import ImageModule from '@/modules/image/Image';
import Account from './Account';
import AddBoardDropDown from './dropdownBodies/AddBoardDropDown';
import Button from '@/modules/button/Button';
import AccountDropDown from './dropdownBodies/AccountDropDown';
import InfoBoardDropDownProps from './dropdownBodies/InfoBoardDropDown';

import { SessionUser } from '@/types/db';
import {
  useState,
  SyntheticEvent,
  MouseEvent as IMouseEvent,
  MutableRefObject,
  useCallback,
} from 'react';
import { TMenuCreateModalNames } from '@/types/state';
import { getSetModal } from '@/context/stateManager';
import { useAtom } from 'jotai';
import AddButton from '@/modules/button/AddButton';

type MenuProps = {
  user: SessionUser;
  logout: () => void;
  containerRef: MutableRefObject<HTMLElement | null>;
};

export type DropState = {
  add: boolean;
  info: boolean;
  note: boolean;
  account: boolean;
};

const defaultDropState: DropState = {
  add: false,
  info: false,
  note: false,
  account: false,
};

const Menu: React.FC<MenuProps> = ({ user, logout, containerRef }) => {
  const [dropState, setDropState] = useState<DropState>(defaultDropState);
  const [, setModalState] = useAtom(getSetModal);

  const closeAllDropDowns = useCallback(() => {
    setDropState(defaultDropState);
  }, []);

  const notifications = [];

  const toggleDropDown = useCallback(
    (e: KeyboardEvent | IMouseEvent | SyntheticEvent<HTMLButtonElement>) => {
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
    },
    [],
  );

  const closeDropDown = (
    e:
      | KeyboardEvent
      | IMouseEvent
      | SyntheticEvent<HTMLButtonElement>
      | keyof DropState,
  ) => {
    if (!(e instanceof KeyboardEvent)) {
      if (typeof e === 'string') {
        setDropState((prev) => {
          return {
            ...prev,
            [e]: false,
          };
        });

        return;
      }

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
  };

  const closeAddBoardDropDown = useCallback(() => {
    closeDropDown('add');
  }, []);

  const closeInfoDropDown = useCallback(() => {
    closeDropDown('info');
  }, []);

  const closeAccountDropDown = useCallback(() => {
    closeDropDown('account');
  }, []);

  const openModal = (modalName: TMenuCreateModalNames) => {
    return () => {
      closeAllDropDowns();
      setModalState({
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
      <AddButton
        className={`menu__btn${dropState.add ? ' active' : ''}`}
        onClick={toggleDropDown}
        attrs={{
          'data-drop-type': 'add',
        }}
      />
      {dropState.add && (
        <AddBoardDropDown
          openModal={openModal}
          closeDropDown={closeAddBoardDropDown}
          containerRef={containerRef}
        />
      )}
      <Button
        attrs={{
          'data-drop-type': 'info',
          className: `menu__btn${dropState.info ? ' active' : ''}`,
          name: 'info',
          title: 'Information',
          onClick: toggleDropDown,
        }}
      >
        <ImageModule src={Info} alt="info" className="menu__ico" />
      </Button>
      {dropState.info && (
        <InfoBoardDropDownProps
          closeDropDown={closeInfoDropDown}
          containerRef={containerRef}
        />
      )}
      <Button
        attrs={{
          'data-drop-type': 'note',
          className: `menu__btn${dropState.note ? ' active' : ''}`,
          name: 'note',
          title: 'Notifications',
          onClick: toggleDropDown,
        }}
      >
        {notifications.length > 0 && (
          <div className="badges">
            {notifications.length >= 99 ? 99 : notifications.length}
          </div>
        )}
        <ImageModule src={Note} alt="notification" className="menu__ico" />
      </Button>
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
        <AccountDropDown
          closeDropDown={closeAccountDropDown}
          logoutHandler={logout}
          containerRef={containerRef}
        />
      )}
    </>
  );
};

export default Menu;
