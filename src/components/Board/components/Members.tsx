// @ts-ignore
import ownerIcon from '@/assets/key.svg?url';

import cls from 'classnames';
import Button from '@/modules/button/Button';
import ImageModule from '@/modules/image/Image';
import Avatar from '@/modules/avatar/Avatar';
import Divider from '@/modules/divider/Divider';
import InviteMembers from './InviteMembers';

import {
  BOARD_MEMBERS_DISPLAY_SLICE_INDEX,
  MOBILE_MEDIA_POINT_WIDTH,
} from '@/utils/constants';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

import type { TBoardMember } from '@/libs/db/postgres/schemas/types';

const defaultSectionClasses = `flex items-center
fixed right-10 
top-[var(--header-height)] 
p-2 mx-1 
z-[2900] 
after:absolute
after:content-['']
after:block
after:left-0
after:w-full
after:h-4
after:bottom-[0.2rem]
after:bg-transparent
after:border-b
after:border-l
after:border-r
after:border-pale-blue`;

const defaultMemberAvatarClasses = `
w-8 h-8
p-4 
relative
flex justify-center items-center 
active:shadow-none 
[&>img]:rounded-[50%] 
transition-[0.2s] duration-[ease] 
border rounded-[50%] 
border 
border-monokai
acrive:border-pale-green
hover:shadow-[0_0_15px_var(--blue)] 
text-sm
overflow-visible
`;

type MembersProps = {
  boardMembers: TBoardMember[];
  ownerId: string;
};

const Members: React.FC<MembersProps> = ({ boardMembers, ownerId }) => {
  const [membersIndex, setMembersIndex] = useState(
    BOARD_MEMBERS_DISPLAY_SLICE_INDEX,
  );
  const containerRef = useRef<HTMLElement>(null);

  const members = useMemo(() => {
    return boardMembers.filter((item) => item.isPending !== true);
  }, [boardMembers]);

  const slicedMembers = useMemo(() => {
    return members.slice(0, membersIndex);
  }, [membersIndex, members]);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < MOBILE_MEDIA_POINT_WIDTH) {
        if (membersIndex !== 1 && members.length > 2) {
          setMembersIndex(1);
        }
      } else {
        if (membersIndex !== BOARD_MEMBERS_DISPLAY_SLICE_INDEX) {
          setMembersIndex(BOARD_MEMBERS_DISPLAY_SLICE_INDEX);
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={cls(defaultSectionClasses)} ref={containerRef}>
      <div className="relative flex items-center max-w-[240px]">
        {slicedMembers.map(({ user }, index) => {
          if (!user) return null;

          return (
            <Fragment key={user.id}>
              {index !== 0 && <Divider classNames="!m-2 !border-l-[1px]" />}
              <Button
                attrs={{
                  title: `${user.displayName}${
                    index === 0 ? ' (Board owner)' : ''
                  }`,
                }}
                containerClassNames={cls(defaultMemberAvatarClasses, {
                  'bg-monokai': !user.imageURL,
                })}
              >
                <Avatar
                  avatarHeight={36}
                  avatarWidth={36}
                  imageURL={user.imageURL || ''}
                  displayName={user.displayName || ''}
                  username={user.username}
                  className={cls(
                    'w-[inherit] h-[inherit] max-w-[unset] absolute',
                  )}
                />
                {user.id === ownerId && (
                  <ImageModule
                    height={64}
                    width={20}
                    alt="owner icon"
                    src={ownerIcon}
                    className="absolute h-16 -right-1 -top-1"
                  />
                )}
              </Button>
            </Fragment>
          );
        })}
        {membersIndex === 1 || members.length > 2 ? (
          <>
            <Divider classNames="!m-2 !border-l-[1px]" />
            <Button
              containerClassNames={cls(
                defaultMemberAvatarClasses,
                'bg-monokai',
                'w-8 h-8',
              )}
              attrs={{
                title: `${members.length - membersIndex} more members`,
              }}
            >
              <Avatar
                avatarHeight={35}
                avatarWidth={35}
                displayName={`${members.length - membersIndex} +`}
                username={'More subscribers'}
                className={cls('w-[inherit] h-[inherit]')}
              />
            </Button>
          </>
        ) : null}
      </div>
      <InviteMembers containerRef={containerRef} members={boardMembers} />
    </section>
  );
};

export { Members };
