import UserMenu from './UserMenu';
import ActiveLink from '@/modules/activeLink/ActiveLink';
import Toast from '@/modules/toast/Toast';
import Modal from '@/modules/modal/Modal';
import ModalForms from '@/modules/modalForms/ModalForms';

import { useAtom, useAtomValue } from 'jotai';
import { StyledHeader } from './styledHeader';
import { getSetModal, getSetToastState } from '@/context/stateManager';
import { useCallback } from 'react';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const currentToast = useAtomValue(getSetToastState);
  const [modalState, setModalState] = useAtom(getSetModal);

  const close = useCallback(() => {
    setModalState({
      isOpen: false,
      window: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledHeader className="unselectable">
      <ActiveLink href="/" className="header__link" activeClassName="">
        <h1>TaskerMan</h1>
      </ActiveLink>
      <UserMenu />
      {currentToast.message && (
        <Toast
          message={currentToast.message}
          typeClass={currentToast.typeClass}
        />
      )}
      <Modal isOpen={modalState.isOpen} close={close}>
        <ModalForms window={modalState.window!} close={close} />
      </Modal>
    </StyledHeader>
  );
};

export default Header;
