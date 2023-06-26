// @ts-ignore
import info from '@/assets/info.svg?url';
// @ts-ignore
import note from '@/assets/notification.svg?url';
// @ts-ignore
import plus from '@/assets/plus.svg?url';

import AccountDropDown from './dropdownBodies/AccountDropDown';
import Account from './Account';
import ImageModule from '@/modules/image/Image';
import AddBoardDropDown from './dropdownBodies/AddBoardDropDown';
import InfoDropDown from './dropdownBodies/InfoDropDown';
import ButtonWithIcon from '@/modules/button/ButtonWithIcon';
import cls from 'classnames';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import {
  getSetModal,
  getSetNotificationsState,
  getSetUserStateAtom,
} from '@/context/stateManager';
import { useAtomValue, useSetAtom } from 'jotai';
import { signOut } from 'next-auth/react';
import { NotificationDropDown } from './dropdownBodies/NotificationDropDown';

import type {
  SyntheticEvent,
  MouseEvent as IMouseEvent,
  MutableRefObject,
} from 'react';
import type { TMenuCreateModalNames } from '@/types/state';

const defaultMenuButtonClasses = `relative flex items-center 
  justify-center mr-4 colored designed
  mobile:mr-2
  border
  border-transparent
  hover:shadow-max
  active:shadow-none
  focus:shadow-none
  focus:border
  focus:border-pale-blue
  active:bg-aqua-active
  `;

const activeMenuButtonClasses =
  '!bg-aqua-active !shadow-none !border-pale-blue';

type MenuProps = {
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

const Menu: React.FC<MenuProps> = ({ containerRef }) => {
  const [dropState, setDropState] = useState<DropState>(defaultDropState);
  const setModalState = useSetAtom(getSetModal);
  const user = useAtomValue(getSetUserStateAtom);
  const { push } = useRouter();
  const notifications = useAtomValue(getSetNotificationsState);

  const logout = useCallback(() => {
    signOut({ redirect: true, callbackUrl: '/' });
  }, []);

  const closeAllDropDowns = useCallback(() => {
    setDropState(defaultDropState);
  }, []);

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

  const accountDoubleClick = useCallback(() => {
    push('/profile');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const closeNoteDropDown = useCallback(() => {
    closeDropDown('note');
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
      <ButtonWithIcon
        classNames={cls(
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
      </ButtonWithIcon>
      {dropState.add && (
        <AddBoardDropDown
          openModal={openModal}
          closeDropDown={closeAddBoardDropDown}
          containerRef={containerRef}
        />
      )}

      <ButtonWithIcon
        classNames={cls(
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
      </ButtonWithIcon>

      {dropState.info && (
        <InfoDropDown
          closeDropDown={closeInfoDropDown}
          containerRef={containerRef}
        />
      )}
      <ButtonWithIcon
        classNames={cls(
          defaultMenuButtonClasses,
          dropState.note && activeMenuButtonClasses,
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
      </ButtonWithIcon>
      {dropState.note && (
        <NotificationDropDown
          closeDropDown={closeNoteDropDown}
          containerRef={containerRef}
        />
      )}
      {user && (
        <>
          <Account
            classNames={cls(
              dropState.account && '!shadow-none !border-pale-blue',
              {
                '!bg-aqua-active': !user.imageURL && dropState.account,
              },
            )}
            imageURL={user.imageURL}
            username={user.username}
            displayName={user.displayName}
            onToggle={toggleDropDown}
            doubleClick={accountDoubleClick}
          />
          {dropState.account && (
            <AccountDropDown
              closeDropDown={closeAccountDropDown}
              logoutHandler={logout}
              containerRef={containerRef}
            />
          )}
        </>
      )}
    </>
  );
};

export default Menu;
