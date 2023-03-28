import DropDown from '@/modules/dropdown/DropDown';
import ImageModule from '@/modules/image/Image';
import Link from 'next/link';

// @ts-ignore
import logoutIcon from '@/assets/logout.svg?url';
// @ts-ignore
import profileIcon from '@/assets/profile.svg?url';
// @ts-ignore
import boardIcon from '@/assets/board_colored.svg?url';

type AccountDropDownProps = {
  closeDropDown: () => void;
  logoutHandler: () => void;
};

const AccountDropDown: React.FC<AccountDropDownProps> = ({
  closeDropDown,
  logoutHandler,
}) => {
  return (
    <DropDown close={closeDropDown} heading="Account">
      <>
        <li className="list__body_mt5">
          <Link className="popup__body__el" href="/profile">
            <ImageModule
              src={profileIcon}
              alt="logout icon"
              title="Logout"
              width={24}
              height={24}
            />
            <span className="el__span">My Profile</span>
          </Link>
        </li>
        <li className="list__body_mt5">
          <Link className="popup__body__el" href="/">
            <ImageModule
              src={boardIcon}
              alt="logout icon"
              title="Logout"
              width={24}
              height={24}
            />
            <span className="el__span">My Boards</span>
          </Link>
        </li>
        <li className="list__body_mt5">
          <button className="popup__body__el" onClick={logoutHandler}>
            <ImageModule
              src={logoutIcon}
              alt="logout icon"
              title="Logout"
              width={24}
              height={24}
            />
            <span className="el__span">Log out</span>
          </button>
        </li>
      </>
    </DropDown>
  );
};
export default AccountDropDown;
