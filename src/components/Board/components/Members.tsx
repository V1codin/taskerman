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

import type { IBoardMember } from '@/models/boards';

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
  boardMembers: IBoardMember[];
  ownerId: string;
};

const Members: React.FC<MembersProps> = ({ boardMembers, ownerId }) => {
  const [membersIndex, setMembersIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const members = useMemo(() => {
    return boardMembers.filter((item) => item.isPending !== true);
  }, [boardMembers]);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < MOBILE_MEDIA_POINT_WIDTH) {
        setMembersIndex(1);
      } else {
        setMembersIndex(BOARD_MEMBERS_DISPLAY_SLICE_INDEX);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className={cls(defaultSectionClasses)} ref={containerRef}>
      <div className="relative flex items-center max-w-[240px]">
        {members.slice(0, membersIndex).map(({ user }, index) => {
          return (
            <Fragment key={user._id}>
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
                  imageURL={user.imageURL}
                  displayName={user.displayName}
                  username={user.username}
                  className={cls('w-[inherit] h-[inherit] max-w-[unset]')}
                />
                {user._id === ownerId && (
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
        {members.length > BOARD_MEMBERS_DISPLAY_SLICE_INDEX && (
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
        )}
      </div>
      <InviteMembers containerRef={containerRef} members={boardMembers} />
    </section>
  );
};

export default Members;
