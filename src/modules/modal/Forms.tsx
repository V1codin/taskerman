import LoginForm from './modalForms/authForms/LoginForm';

import type {
  IModalWindow,
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
  const { type, view } = modalMeta;
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
  }

  /*
  .color-picker {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 10px;
  }

  .color-picker__el {
    cursor: pointer;
    padding: 15px;

    border: 1px dashed transparent;
  }

  .color-picker > li {
    margin-left: 10px;
  }
  .color-picker > li:first-of-type {
    margin-left: 0;
  }

  if (type === 'create') {
    //? prop text is not needed in this component so far
    return <CreateForms view={view as TMenuCreateModalNames} />;
  }

  if (type === 'delete') {
    return (
      <DeleteForms
        view={view as TMenuDeleteModalNames}
        data={data as TDeleteModalData}
      />
    );
  }
  */

  return null;
};
