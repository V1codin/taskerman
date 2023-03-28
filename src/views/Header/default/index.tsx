import styled from 'styled-components';
import Modal from '@/modules/modal/Modal';
import AuthForms from '@/modules/authForms/AuthForms';

import { useAtom } from 'jotai';
import { getSetAuthModal } from '@/context/stateManager';
import { useDisclosure } from '@/hooks/useDisclosure/useDisclosure';
import { TAuthForms } from '../../../../types/state';

type DefaultHeaderProps = {};

const StyledContainer = styled.div`
  display: flex;
  margin-right: 20px;

  & button {
    font-size: 1em;
    font-weight: 700;
    color: var(--yellow);
    padding: 5px 10px;
    margin-right: 5px;
  }
  .sign {
    color: #ffffff;
    margin-right: 0;
    border-radius: 7px;
    border: 1px dashed transparent;
    transition: 0.3s;
  }

  & button:hover {
    text-decoration: underline;
  }

  .sign:hover {
    text-decoration: none;
    background-color: #4343ff;
  }
`;

const DefaultHeader: React.FC<DefaultHeaderProps> = () => {
  const [authState, setAuthState] = useAtom(getSetAuthModal);

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

  return (
    <StyledContainer>
      <Modal isOpen={isOpen} close={onClose}>
        <AuthForms type={authState.view} />
      </Modal>
      <button onClick={onOpen} name="login">
        Log in
      </button>
      <button className="sign" onClick={onOpen} name="signup">
        Sign up
      </button>
    </StyledContainer>
  );
};

export default DefaultHeader;
