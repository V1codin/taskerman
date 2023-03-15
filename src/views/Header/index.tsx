import ActiveLink from '@/modules/activeLink/ActiveLink';
import DefaultHeader from './default';

import { useAtomValue } from 'jotai';
import { readAuthenticated } from '@/context/stateManager';

import { StyledHeader } from './styledHeader';

export default function Header() {
  // const isLogged = useAtomValue(readAuthenticated);
  const isLogged = false;

  return (
    <StyledHeader className="unselectable">
      <ActiveLink href="/" className="header__link" activeClassName="">
        <h1>TrelloF</h1>
      </ActiveLink>
      {/* <LoggedHeader /> */}
      {isLogged ? <p>Logged</p> : <DefaultHeader />}
    </StyledHeader>
  );
}
