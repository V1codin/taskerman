import Menu from './components/Menu';

import { StyledNav } from './styledNav';
import { signOut } from 'next-auth/react';
import { useCallback, useRef } from 'react';
import { SessionUser } from '../../../../types/db';

type LoggedHeaderProps = {
  userData: SessionUser;
};

const LoggedHeader: React.FC<LoggedHeaderProps> = ({ userData }) => {
  const navRef = useRef<HTMLElement | null>(null);
  const logout = useCallback(() => {
    signOut({ redirect: true, callbackUrl: '/' });
  }, []);

  return (
    <StyledNav ref={navRef}>
      <Menu user={userData} logout={logout} containerRef={navRef} />
    </StyledNav>
  );
};
export default LoggedHeader;
