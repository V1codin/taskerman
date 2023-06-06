// @ts-ignore
import ownerIco from '@/assets/key.svg?url';

import cls from 'classnames';
import Button from '@/modules/button/Button';
import ImageModule from '@/modules/image/Image';
import Avatar from '@/modules/avatar/Avatar';
import Divider from '@/modules/divider/Divider';

import { BOARD_MEMBERS_DISPLAY_SLICE_INDEX } from '@/utils/constants';
import { Fragment } from 'react';

import type { IBoardMember } from '@/models/boards';

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
  members: IBoardMember[];
  ownerId: string;
};

const Members: React.FC<MembersProps> = ({ members, ownerId }) => {
  return (
    <section
      className="flex items-center
    fixed right-14 
    top-[var(--header-height)] 
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
    after:border-pale-blue
  "
    >
      <div
        className="relative p-2 flex items-center max-w-[220px] mx-2 overflow-hidden
      "
      >
        {members
          .slice(0, BOARD_MEMBERS_DISPLAY_SLICE_INDEX)
          .map(({ user }, index) => {
            return (
              <Fragment key={user._id}>
                {index !== 0 && <Divider classNames="!m-2" />}
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
                      src={ownerIco}
                      className="absolute h-16 -right-1 -top-1"
                    />
                  )}
                </Button>
              </Fragment>
            );
          })}
        {members.length > BOARD_MEMBERS_DISPLAY_SLICE_INDEX && (
          <>
            <Divider classNames="!m-2" />
            <Button
              containerClassNames={cls(
                defaultMemberAvatarClasses,
                'bg-monokai',
                'w-8 h-8',
              )}
              attrs={{
                title: `${
                  members.length - BOARD_MEMBERS_DISPLAY_SLICE_INDEX
                } more members`,
              }}
            >
              <Avatar
                avatarHeight={35}
                avatarWidth={35}
                displayName={`${
                  members.length - BOARD_MEMBERS_DISPLAY_SLICE_INDEX
                } +`}
                username={'More subscribers'}
                className={cls('w-[inherit] h-[inherit]')}
              />
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default Members;
