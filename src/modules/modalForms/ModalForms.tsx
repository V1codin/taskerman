import AuthForms from './authForms/AuthForms';
import CreateForms from './createForms/CreateForms';

import { IModalWindow, TAuthForms, TMenuModalNames } from '@/types/state';
type ModalFormsProps = {
  window: IModalWindow;
};

const ModalForms: React.FC<ModalFormsProps> = ({ window: { type, view } }) => {
  if (!type) return null;

  if (type === 'auth') {
    return <AuthForms view={view as TAuthForms} />;
  }

  if (type === 'create') {
    return <CreateForms view={view as TMenuModalNames} />;
  }

  return null;
};
export default ModalForms;
