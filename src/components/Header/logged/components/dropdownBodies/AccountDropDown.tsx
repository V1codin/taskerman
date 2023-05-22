// @ts-ignore
import logoutIcon from '@/assets/logout.svg?url';
// @ts-ignore
import profileIcon from '@/assets/profile.svg?url';
// @ts-ignore
import boardIcon from '@/assets/board_colored.svg?url';

import DropDown from '@/modules/dropdown/DropDown';
import ImageModule from '@/modules/image/Image';
import Link from 'next/link';
import Button from '@/modules/button/Button';
import DropDownElement from './DropDownElement';

import { useOuterClick } from '@/hooks/useOuterClick';
import { listInnerActiveElementDefaultClass } from './DropDownElement';

import type { MutableRefObject } from 'react';

type AccountDropDownProps = {
  closeDropDown: () => void;
  logoutHandler: () => void;

  containerRef: MutableRefObject<HTMLElement | null>;
};

const AccountDropDown: React.FC<AccountDropDownProps> = ({
  closeDropDown,
  logoutHandler,
  containerRef,
}) => {
  useOuterClick(containerRef, closeDropDown);
  return (
    <DropDown close={closeDropDown} heading="Account">
      <DropDownElement>
        <Link
          className={listInnerActiveElementDefaultClass}
          href="/profile"
          onClick={closeDropDown}
        >
          <ImageModule
            src={profileIcon}
            alt="profile icon"
            title="My Profile"
            width={24}
            height={24}
          />
          <span className="ml-1">My Profile</span>
        </Link>
      </DropDownElement>
      <DropDownElement>
        <Link
          className={listInnerActiveElementDefaultClass}
          href="/boards"
          onClick={closeDropDown}
        >
          <ImageModule
            src={boardIcon}
            alt="boards icon"
            title="My Boards"
            width={24}
            height={24}
          />
          <span>My Boards</span>
        </Link>
      </DropDownElement>
      <DropDownElement>
        <Button
          attrs={{
            className: listInnerActiveElementDefaultClass,
            onClick: logoutHandler,
          }}
        >
          <ImageModule
            src={logoutIcon}
            alt="logout icon"
            title="Logout"
            width={24}
            height={24}
          />
          <span className="ml-1">Log out</span>
        </Button>
      </DropDownElement>
    </DropDown>
  );
};

export default AccountDropDown;
