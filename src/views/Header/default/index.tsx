import styled from 'styled-components';

import { useAtom } from 'jotai';
import { getSetModal } from '@/context/stateManager';
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
  const [, setAuthState] = useAtom(getSetModal);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAuthState({
      isOpen: true,
      window: {
        type: 'auth',
        view: e.currentTarget.name as TAuthForms,
      },
    });
  };

  return (
    <StyledContainer>
      <button onClick={openModal} name="login">
        Log in
      </button>
      <button className="sign" onClick={openModal} name="signup">
        Sign up
      </button>
    </StyledContainer>
  );
};

export default DefaultHeader;
