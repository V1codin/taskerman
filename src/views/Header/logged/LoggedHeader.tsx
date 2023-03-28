import Menu from './components/Menu';
import Account from './components/Account';
import AccountDropDown from './components/dropdownBodies/AccountDropDown';

import { StyledNav } from './styledNav';
import { useDisclosure } from '@/hooks/useDisclosure/useDisclosure';
import { signOut } from 'next-auth/react';
import { useCallback } from 'react';
import { SessionUser } from '../../../../types/db';

type LoggedHeaderProps = {
  userData: SessionUser;
};

const LoggedHeader: React.FC<LoggedHeaderProps> = ({ userData }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const logout = useCallback(() => {
    signOut({ redirect: true, callbackUrl: '/' });
  }, []);

  return (
    <StyledNav>
      <Menu />
      <Account
        imageURL={userData.imageURL}
        username={userData.username}
        displayName={userData.displayName}
        onToggle={onToggle}
      />
      {isOpen && (
        <AccountDropDown closeDropDown={onClose} logoutHandler={logout} />
      )}
    </StyledNav>
  );
};
export default LoggedHeader;
