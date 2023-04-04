import UserMenu from './UserMenu';
import ActiveLink from '@/modules/activeLink/ActiveLink';
import Toast from '@/modules/toast/Toast';
import Modal from '@/modules/modal/Modal';
import ModalForms from '@/modules/modalForms/ModalForms';

import { useAtom, useAtomValue } from 'jotai';
import { StyledHeader } from './styledHeader';
import { getSetModal, getSetToastState } from '@/context/stateManager';
import { SessionUser } from '@/types/db';

type HeaderProps = {
  user: SessionUser | null;
};

const Header: React.FC<HeaderProps> = ({ user }) => {
  const currentToast = useAtomValue(getSetToastState);
  const [modalState, setModalState] = useAtom(getSetModal);

  const close = () => {
    setModalState({
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
      <Modal isOpen={modalState.isOpen} close={close}>
        <ModalForms window={modalState.window!} />
      </Modal>
      <ActiveLink href="/" className="header__link" activeClassName="">
        <h1>TaskerMan</h1>
      </ActiveLink>
      <UserMenu user={user} />
    </StyledHeader>
  );
};

export default Header;
