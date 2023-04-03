import AuthForms from './authForms/AuthForms';
import CreateForms from './createForms/CreateForms';
import DeleteForms from './deleteForms/DeleteForms';

import {
  IModalWindow,
  TAuthForms,
  TMenuCreateModalNames,
  TMenuDeleteModalNames,
} from '@/types/state';
type ModalFormsProps = {
  window: IModalWindow;
};

const ModalForms: React.FC<ModalFormsProps> = ({
  window: { type, view, text },
}) => {
  if (!type) return null;

  if (type === 'auth') {
    //? prop text is not needed in this component so far
    return <AuthForms view={view as TAuthForms} />;
  }

  if (type === 'create') {
    //? prop text is not needed in this component so far
    return <CreateForms view={view as TMenuCreateModalNames} />;
  }

  if (type === 'delete') {
    return <DeleteForms view={view as TMenuDeleteModalNames} text={text} />;
  }

  return null;
};
export default ModalForms;
