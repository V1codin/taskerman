import UserMenu from './UserMenu';
import ActiveLink from '@/modules/activeLink/ActiveLink';
import Toast from '@/modules/toast/Toast';
import Modal from '@/modules/modal/Modal';
import ModalForms from '@/modules/modalForms/ModalForms';

import { useAtom, useAtomValue } from 'jotai';
import { StyledHeader } from './styledHeader';
import { getSetModal, getSetToastState } from '@/context/stateManager';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const currentToast = useAtomValue(getSetToastState);
  const [authState, setAuthState] = useAtom(getSetModal);

  const close = () => {
    setAuthState({
      isOpen: false,
      window: null,
    });
  };

  return (
    <StyledHeader className="unselectable">
      {currentToast.message && (
        <Toast
          message={currentToast.message}
          typeClass={currentToast.typeClass}
        />
      )}
      <Modal isOpen={authState.isOpen} close={close}>
        <ModalForms window={authState.window!} />
      </Modal>
      <ActiveLink href="/" className="header__link" activeClassName="">
        <h1>TaskerMan</h1>
      </ActiveLink>
      <UserMenu />
    </StyledHeader>
  );
};

export default Header;
