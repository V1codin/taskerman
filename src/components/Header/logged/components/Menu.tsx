// @ts-ignore
import info from '@/assets/info.svg?url';
// @ts-ignore
import note from '@/assets/notification.svg?url';
// @ts-ignore
import plus from '@/assets/plus.svg?url';

import AccountDropDown from './dropdownBodies/AccountDropDown';
import Account from './Account';
import Button from '@/modules/button/Button';
import ImageModule from '@/modules/image/Image';
import AddBoardDropDown from './dropdownBodies/AddBoardDropDown';
import InfoDropDown from './dropdownBodies/InfoDropDown';
import cls from 'classnames';

import { useState, useCallback } from 'react';
import { getSetModal } from '@/context/stateManager';
import { useAtom } from 'jotai';
import { signOut } from 'next-auth/react';

import type { SessionUser } from '@/types/db';
import type {
  SyntheticEvent,
  MouseEvent as IMouseEvent,
  MutableRefObject,
} from 'react';
import type { TMenuCreateModalNames } from '@/types/state';

const defaultMenuButtonClasses = cls(
  `relative flex items-center 
  justify-center mr-4 colored
  border
  border-transparent
  hover:shadow-max
  active:shadow-none
  focus:shadow-none
  focus:border
  focus:border-pale-blue
  active:bg-aqua-active
  `,
);

const activeMenuButtonClasses = cls(
  '!bg-aqua-active !shadow-none !border-pale-blue',
);

type MenuProps = {
  user: SessionUser;
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

const Menu: React.FC<MenuProps> = ({ user, containerRef }) => {
  const [dropState, setDropState] = useState<DropState>(defaultDropState);
  const [, setModalState] = useAtom(getSetModal);

  const logout = useCallback(() => {
    signOut({ redirect: true, callbackUrl: '/' });
  }, []);

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

  const openModal = useCallback(
    (modalName: TMenuCreateModalNames) => {
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
    },
    [closeAllDropDowns, setModalState],
  );

  return (
    <>
      <Button
        containerClassNames={cls(
          defaultMenuButtonClasses,
          dropState.add && activeMenuButtonClasses,
        )}
        attrs={{
          'data-drop-type': 'add',
          name: 'add',
          title: 'Create',
          onClick: toggleDropDown,
        }}
      >
        <ImageModule src={plus} alt="add" height={20} width={20} />
      </Button>
      {dropState.add && (
        <AddBoardDropDown
          openModal={openModal}
          closeDropDown={closeAddBoardDropDown}
          containerRef={containerRef}
        />
      )}

      <Button
        containerClassNames={cls(
          defaultMenuButtonClasses,
          dropState.info && activeMenuButtonClasses,
        )}
        attrs={{
          'data-drop-type': 'info',
          name: 'info',
          title: 'Information',
          onClick: toggleDropDown,
        }}
      >
        <ImageModule src={info} alt="info" height={20} width={20} />
      </Button>

      {dropState.info && (
        <InfoDropDown
          closeDropDown={closeInfoDropDown}
          containerRef={containerRef}
        />
      )}
      <Button
        containerClassNames={cls(
          defaultMenuButtonClasses,
          dropState.info && activeMenuButtonClasses,
        )}
        attrs={{
          'data-drop-type': 'note',
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
        <ImageModule src={note} alt="note" height={20} width={20} />
      </Button>
      {/*
      .note {
        width: 450px;
        height: 300px;

        overflow: auto;
      }
      .note > header {
        position: sticky;
        top: 0;
        background-color: ${({ theme }) => theme.colors.gentleBlack};
        z-index: 500;
      }

       */}
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
