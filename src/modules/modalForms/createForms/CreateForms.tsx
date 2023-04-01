import CreateBoardModal from '@/views/Header/logged/components/modals/CreateBoardModal';
import { TMenuModalNames } from '@/types/state';

type CreateFormsProps = {
  view: TMenuModalNames;
};

const CreateForms: React.FC<CreateFormsProps> = ({ view }) => {
  if (view === 'create_board') {
    return <CreateBoardModal />;
  }

  return null;
};

export default CreateForms;
