import LoginForm from './modalForms/authForms/LoginForm';
import DeleteBoardForm from './modalForms/boardForms/DeleteBoardForm';
import CreateBoardForm from './modalForms/boardForms/CreateBoardForm';
import DeclineInviteBoardForm from './modalForms/boardForms/DeclineInviteBoardForm';

import type {
  IModalWindow,
  TDeleteModalData,
  /*
  TAuthForms,
  TMenuCreateModalNames,
  TMenuDeleteModalNames,
  */
} from '@/types/state';

type FormProps = {
  modalMeta: IModalWindow;
};

export const ModalForm: React.FC<FormProps> = ({ modalMeta }) => {
  const { type, view, data } = modalMeta;
  if (!type) return null;

  if (type === 'auth') {
    if (view === 'login') {
      return <LoginForm />;
    }
    /*
    if (view === 'signup'){
      return <SignUpForm />
    }
    */

    // !
    return null;
  }

  if (type === 'delete') {
    if (view === 'delete_board') {
      return <DeleteBoardForm {...(data as TDeleteModalData)} />;
    }

    if (view === 'delete_notification') {
      return <DeclineInviteBoardForm {...(data as TDeleteModalData)} />;
    }

    // !
    return null;
  }

  if (type === 'create') {
    if (view === 'create_board') {
      //? prop text is not needed in this component so far
      return <CreateBoardForm />;
    }

    // !
    return null;
  }

  return null;
};
