import UserMenu from './UserMenu';
import ActiveLink from '@/modules/activeLink/ActiveLink';
import Toast from '@/modules/toast/Toast';

import { useAtomValue } from 'jotai';
import { StyledHeader } from './styledHeader';
import { getSetToastState } from '@/context/stateManager';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const currentToast = useAtomValue(getSetToastState);

  return (
    <StyledHeader className="unselectable">
      {currentToast.message && (
        <Toast
          message={currentToast.message}
          typeClass={currentToast.typeClass}
        />
      )}
      <ActiveLink href="/" className="header__link" activeClassName="">
        <h1>TrelloF</h1>
      </ActiveLink>
      <UserMenu />
    </StyledHeader>
  );
};

export default Header;
