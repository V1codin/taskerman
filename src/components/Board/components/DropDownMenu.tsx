// @ts-ignore
import blocked from '@/assets/blocked_user.svg?url';
// @ts-ignore
import pending from '@/assets/hourglass.svg?url';
// @ts-ignore
import check from '@/assets/rounded_check.svg?url';

import DropDown from '@/modules/dropdown/DropDown';
import Avatar from '@/modules/avatar/Avatar';
import Input from '@/modules/input/Input';
import cls from 'classnames';
import ImageModule from '@/modules/image/Image';
import ButtonWithIcon from '@/modules/button/ButtonWithIcon';
import Button from '@/modules/button/Button';

import { api } from '@/utils/api/api';
import { Process } from '@/modules/process/Process';
import { useMemo, useRef, useState } from 'react';
import { debounce } from '@/utils/helpers';
import { usePathname } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { useFocus } from '@/hooks/useFocus';
import { ServerResponseError } from '@/libs/error.service';
import { getSetToastState } from '@/context/stateManager';

import type { ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import type { SessionUser } from '@/types/db';
import type { IBoardMember } from '@/models/boards';

type DropDownMenuProps = {
  closeDropDown: () => void;
  currentMembers: IBoardMember[];
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  closeDropDown,
  currentMembers,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [members, setMembers] = useState<SessionUser[]>([]);
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const setToast = useSetAtom(getSetToastState);
  const currentBoardId = usePathname().split('/').pop() || '';

  const isUpToInvite = useMemo(() => {
    return Object.values(selected).some((item) => item === true);
  }, [selected]);

  const [currentMembersMap, setCurrentMembersMap] = useState(() =>
    currentMembers.reduce<Record<string, { isPending: boolean }>>(
      (acc, member) => {
        acc[member.user._id] = {
          isPending: member.isPending,
        };
        return acc;
      },
      {},
    ),
  );

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

  const sendInvite = async () => {
    try {
      setLoader(true);

      const response = await api.create('board_members', {
        members: Object.keys(selected),
        type: 'invite_members',
        boardId: currentBoardId,
      });

      response.addedMembersIds.forEach((item) => {
        setCurrentMembersMap({
          ...currentMembersMap,
          [item]: {
            isPending: true,
          },
        });
      });

      setSelected({});

      setToast({
        message: response.message,
        typeClass: 'notification',
        timeout: 3500,
      });
    } catch (e) {
      setToast({
        message:
          e instanceof ServerResponseError ? e.message : 'Something went wrong',
        typeClass: 'conflict',
        timeout: 3500,
      });
    } finally {
      setLoader(false);
    }
  };

  useFocus(inputRef, true);

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

  return (
    <>
      <div
        className="absolute 
        z-[4000] top-[55px] 
        right-0 min-w-[300px]"
      >
        <Input
          ref={inputRef}
          classNames={cls('border-b-[1px] border-pale-blue', {
            'pr-[50px]': loader || isUpToInvite,
          })}
          attrs={{
            onChange: searchChange.current,
            placeholder: 'Search members...',
          }}
        />
        {loader ? (
          <Process
            isShown={loader}
            size="w-14 h-auto"
            classNames="absolute !-right-[30px] !left-auto"
          />
        ) : isUpToInvite ? (
          <ButtonWithIcon
            classNames="absolute !right-[5px] 
            w-8 h-8 border-solid 
            top-1 !rounded-[50%] !p-0 bg-bright-blue 
            active:bg-bright-green hover:bg-blue"
            attrs={{
              onClick: sendInvite,
            }}
          >
            <ImageModule src={check} alt="Confirm" />
          </ButtonWithIcon>
        ) : null}
      </div>
      {members.length > 0 && (
        <DropDown
          close={closeDropDown}
          containerClassNames="min-w-[300px] !top-[100px] max-h-[250px] overflow-y-auto !right-0"
          listClassNames="!p-[0.4rem]"
        >
          {members.map((item) => {
            const isAlreadyMember = item._id in currentMembersMap;
            const isPending =
              isAlreadyMember && currentMembersMap[item._id]?.isPending;

            return (
              <li key={item._id} className="text-white">
                <Button
                  containerClassNames={cls(
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
                  attrs={{
                    'data-id': item._id,
                    onClick: selectMember,
                    title: isAlreadyMember
                      ? isPending
                        ? 'Already invited'
                        : 'Already a member'
                      : 'Add to board',
                    disabled: isAlreadyMember,
                  }}
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
                      width={isPending ? 25 : 30}
                      height={isPending ? 25 : 30}
                      src={isPending ? pending : blocked}
                      alt="User is already member"
                      className="absolute right-[5px]"
                    />
                  )}
                </Button>
              </li>
            );
          })}
        </DropDown>
      )}
    </>
  );
};

export default DropDownMenu;
