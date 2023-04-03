import CreateBoardModal from '@/views/Header/logged/components/modals/CreateBoardModal';
import { TMenuCreateModalNames } from '@/types/state';

type CreateFormsProps = {
  view: TMenuCreateModalNames;
};

const CreateForms: React.FC<CreateFormsProps> = ({ view }) => {
  if (view === 'create_board') {
    return <CreateBoardModal />;
  }

  return null;
};

export default CreateForms;
