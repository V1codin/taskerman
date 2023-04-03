import Confirm from '@/modules/confirm/Confirm';

type DeleteBoardModalProps = {
  boardTitle?: string;
};

const DeleteBoardModal: React.FC<DeleteBoardModalProps> = ({ boardTitle }) => {
  return (
    <Confirm>
      {boardTitle ? (
        <h3>
          Delete the board, titled -{' '}
          <span style={{ color: 'red' }}>{boardTitle}</span>?
        </h3>
      ) : (
        <h3>Confirm the board deleting</h3>
      )}
    </Confirm>
  );
};
export default DeleteBoardModal;
