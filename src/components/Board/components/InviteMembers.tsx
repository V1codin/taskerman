// @ts-ignore
import addIcon from '@/assets/add_members.svg?url';

import cls from 'classnames';
import ButtonWithIcon from '@/modules/button/ButtonWithIcon';
import Divider from '@/modules/divider/Divider';
import ImageModule from '@/modules/image/Image';
import DropDownMenu from './DropDownMenu';

import { useOuterClick } from '@/hooks/useOuterClick';
import { useCallback, useState } from 'react';

import type { RefObject } from 'react';
import type { IBoardMember } from '@/models/boards';

const defaultAddMemberClasses = `w-8 h-8 border
!p-[5px]
border-transparent
hover:shadow-max
active:shadow-none
focus:shadow-none
focus:border
focus:border-pale-blue
active:bg-aqua-active 
colored designed
`;

type InviteMembersProps = {
  containerRef: RefObject<HTMLElement>;
  members: IBoardMember[];
};

const InviteMembers: React.FC<InviteMembersProps> = ({
  containerRef,
  members,
}) => {
  const [dropDown, setDropDown] = useState(false);

  const toggleDropDown = useCallback(() => {
    setDropDown((prev) => !prev);
  }, []);

  const closeDropDown = () => {
    setDropDown(false);
  };

  useOuterClick(containerRef, closeDropDown);

  return (
    <>
      <Divider classNames="!m-2 !border-l-[1px]" />
      <ButtonWithIcon
        attrs={{
          onClick: toggleDropDown,
        }}
        classNames={cls(defaultAddMemberClasses, {
          '!bg-aqua-active !shadow-none !border-pale-blue': dropDown,
        })}
      >
        <ImageModule
          width={28}
          height={28}
          alt="add icon"
          src={addIcon}
          className="w-7 h-7"
        />
      </ButtonWithIcon>
      <DropDownMenu
        closeDropDown={closeDropDown}
        isOpen={dropDown}
        currentMembers={members}
      />
    </>
  );
};

export default InviteMembers;
