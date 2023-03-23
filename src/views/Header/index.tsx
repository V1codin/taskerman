import DefaultHeader from './default';
import ActiveLink from '@/modules/activeLink/ActiveLink';
import Toast from '@/modules/toast/Toast';
import LoggedHeader from './logged/LoggedHeader';

import { useAtomValue } from 'jotai';
import { StyledHeader } from './styledHeader';
import { getSetToastState, isAuthenticatedAtom } from '@/context/stateManager';

export default function Header() {
  const currentToast = useAtomValue(getSetToastState);
  const isLogged = useAtomValue(isAuthenticatedAtom);

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
      {isLogged ? <LoggedHeader /> : <DefaultHeader />}
    </StyledHeader>
  );
}
