import { TMenuDeleteModalNames } from '@/types/state';
import DeleteBoardModal from '@/views/Header/logged/components/modals/DeleteBoardModal';

type DeleteFormsProps = {
  view: TMenuDeleteModalNames;
  text?: string;
};

const DeleteForms: React.FC<DeleteFormsProps> = ({ view, text }) => {
  if (view === 'delete_board') {
    return <DeleteBoardModal boardTitle={text} />;
  }

  return null;
};
export default DeleteForms;
