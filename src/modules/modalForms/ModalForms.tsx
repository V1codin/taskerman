import AuthForms from './authForms/AuthForms';
import CreateForms from './createForms/CreateForms';
import DeleteForms from './deleteForms/DeleteForms';

import {
  IModalWindow,
  TAuthForms,
  TDeleteModalData,
  TMenuCreateModalNames,
  TMenuDeleteModalNames,
} from '@/types/state';
type ModalFormsProps = {
  window: IModalWindow;
};

const ModalForms: React.FC<ModalFormsProps> = ({
  window: { type, view, data },
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
    return (
      <DeleteForms
        view={view as TMenuDeleteModalNames}
        data={data as TDeleteModalData}
      />
    );
  }

  return null;
};
export default ModalForms;
