import Modal from '@/modules/modal/Modal';
import AuthForms from '@/modules/AuthForms/AuthForms';

import { useAtom } from 'jotai';
import { getSetAuthModal } from '@/context/stateManager';
import { useDisclosure } from '@/hooks/useDisclosure/useDisclosure';
import { TAuthForms } from '../../../../types/state';

export default function DefaultHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure({
    onOpen: (e: React.MouseEvent<HTMLButtonElement>) => {
      setAuthState({
        isOpen: true,
        view: e.currentTarget.name as TAuthForms,
      });
    },
    onClose: () => {
      setAuthState({
        isOpen: false,
        view: '',
      });
    },
  });
  const [authState, setAuthState] = useAtom(getSetAuthModal);

  return (
    <div className="header__log">
      <Modal isOpen={isOpen} onClose={onClose}>
        <AuthForms type={authState.view} />
      </Modal>
      <button className="log__btn" onClick={onOpen} name="login">
        Log in
      </button>
      <button className="log__btn log__btn_sign" onClick={onOpen} name="signup">
        Sign up
      </button>
    </div>
  );
}

/*
import ActiveLink from '@/modules/activeLink/ActiveLink';

export default function DefaultHeader() {
  return (
    <div className="header__log">
      <ActiveLink href="/login" activeClassName="active">
        <button className="log__btn">Log in</button>
      </ActiveLink>
      <ActiveLink href="/signup" activeClassName="active">
        <button className="log__btn log__btn_sign">Sign up</button>
      </ActiveLink>
    </div>
  );
}


*/
