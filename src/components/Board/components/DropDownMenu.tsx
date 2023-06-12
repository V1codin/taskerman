// @ts-ignore
import blocked from '@/assets/blocked_user.svg?url';

import DropDown from '@/modules/dropdown/DropDown';
import Avatar from '@/modules/avatar/Avatar';
import Input from '@/modules/input/Input';
import cls from 'classnames';
import ImageModule from '@/modules/image/Image';

import { api } from '@/utils/api/api';
import { Process } from '@/modules/process/Process';
import { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from '@/utils/helpers';
import { atom, useAtomValue } from 'jotai';
import { getSetSingleBoardState } from '@/context/stateManager';
import { useFocus } from '@/hooks/useFocus';

import type { ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import type { SessionUser } from '@/types/db';

type DropDownMenuProps = {
  closeDropDown: () => void;
  isOpen: boolean;
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  closeDropDown,
  isOpen,
}) => {
  const currentMembers = useAtomValue(
    useMemo(
      // This is also fine
      () =>
        atom(
          (get) =>
            get(getSetSingleBoardState).board?.members?.reduce<
              Record<string, boolean>
            >((acc, member) => {
              acc[member.user._id] = true;
              return acc;
            }, {}) || {},
        ),

      [],
    ),
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [members, setMembers] = useState<SessionUser[]>([]);
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const selectMember = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (e.currentTarget.dataset['id']) {
      const id = e.currentTarget.dataset['id'];

      setSelected((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    }
  };

  const resetSelectedMembers = () => {
    setSelected({});
  };

  useFocus(inputRef, isOpen);

  useEffect(() => {
    if (!isOpen) {
      setMembers([]);
      resetSelectedMembers();
    }
  }, [isOpen]);

  const searchChange = useRef(
    debounce(async (e: ChangeEvent<HTMLInputElement>) => {
      resetSelectedMembers();
      if (!e.target.value) {
        setMembers([]);
        return;
      }
      try {
        if (!loader) {
          setLoader(true);
        }
        const response = await api.read(
          'user',
          {
            nameAlias: e.target.value,
          },
          {
            additionalPath: '/search/alias',
          },
        );

        setMembers(response.data);
      } catch (e) {
      } finally {
        setLoader(false);
      }
    }, 800),
  );

  if (!isOpen) return null;

  return (
    <>
      <div
        className="absolute 
        z-[4000] top-[55px] 
        right-0 min-w-[300px]"
      >
        <Input
          ref={inputRef}
          classNames="border-b-[1px] border-pale-blue"
          attrs={{
            onChange: searchChange.current,
            placeholder: 'Search members...',
          }}
        />
        <Process
          isShown={loader}
          size="w-14 h-auto"
          classNames="absolute !-right-[30px] !left-auto"
        />
      </div>
      {members.length > 0 && (
        <DropDown
          close={closeDropDown}
          containerClassNames="min-w-[300px] !top-[100px] max-h-[250px] overflow-y-auto !right-0"
          listClassNames="!p-[0.4rem]"
        >
          {members.map((item) => {
            const isAlreadyMember = currentMembers[item._id];

            return (
              <li key={item._id} className="text-white">
                <button
                  onClick={selectMember}
                  data-id={item._id}
                  title={isAlreadyMember ? 'Already a member' : 'Add to board'}
                  disabled={isAlreadyMember}
                  className={cls(
                    `
                w-full p-2 border-solid border-b-[1px] border-b-pale-blue
                grid
                auto-cols-[1fr] grid-cols-[0.75fr_0.25fr] 
                grid-rows-[0.5fr_0.5fr] gap-[0px_0px]
                dropdown_members
                hover:bg-hover-blue
                active:bg-aqua-active
                `,
                    {
                      'bg-blue-second': selected[item._id],
                      'border-b-yellow': selected[item._id],
                      'hover:!bg-blue': selected[item._id],
                    },
                  )}
                >
                  <p
                    className={cls(`dropdown_members_name text-yellow`, {
                      '!text-disabled-grey': isAlreadyMember,
                    })}
                  >
                    {item.displayName}
                  </p>
                  <p className="dropdown_members_email">{item.email}</p>
                  <Avatar
                    imageURL={item.imageURL}
                    displayName={item.displayName}
                    avatarWidth={38}
                    avatarHeight={38}
                    className="rounded-[50%] col-start-2 dropdown_members_avatar h-full max-w-[38px] bg-monokai"
                  />
                  {isAlreadyMember && (
                    <ImageModule
                      width={30}
                      height={30}
                      src={blocked}
                      alt="User is already member"
                      className="absolute right-[5px]"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </DropDown>
      )}
    </>
  );
};

export default DropDownMenu;
