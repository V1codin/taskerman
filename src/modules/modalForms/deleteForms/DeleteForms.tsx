import { TDeleteModalData, TMenuDeleteModalNames } from '@/types/state';
import DeleteBoardModal from '@/views/Header/logged/components/modals/DeleteBoardModal';

type DeleteFormsProps = {
  view: TMenuDeleteModalNames;
  data: TDeleteModalData;
};

const DeleteForms: React.FC<DeleteFormsProps> = ({ view, data }) => {
  if (view === 'delete_board') {
    return <DeleteBoardModal {...data} />;
  }

  return null;
};
export default DeleteForms;
