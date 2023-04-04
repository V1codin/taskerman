import Confirm from '@/modules/confirm/Confirm';

import { getSetBoardsState, getSetModal } from '@/context/stateManager';
import { TDeleteModalData } from '@/types/state';
import { deleteBoard } from '@/utils/api/boards';
import { useSetAtom } from 'jotai';
import { SyntheticEvent, useCallback } from 'react';

type DeleteBoardModalProps = TDeleteModalData;

const DeleteBoardModal: React.FC<DeleteBoardModalProps> = ({ id, text }) => {
  const setModal = useSetAtom(getSetModal);
  const setBoards = useSetAtom(getSetBoardsState);

  const refreshData = useCallback(
    (boardId: string) => {
      setBoards((state) => state.filter((item) => item._id !== boardId));
    },
    [setBoards],
  );

  const accept = useCallback(
    async (e: SyntheticEvent<HTMLElement>) => {
      e.preventDefault();
      try {
        await deleteBoard(id);
        refreshData(id);

        setModal({
          isOpen: false,
          window: null,
        });
      } catch (e) {
        console.error('error', e);
      }
    },
    [id, refreshData, setModal],
  );

  const decline = useCallback(() => {
    setModal({
      isOpen: false,
      window: null,
    });
  }, [setModal]);

  return (
    <Confirm accept={accept} decline={decline}>
      {text ? (
        <h3>
          Delete the board, titled -{' '}
          <span style={{ color: 'red' }}>{text}</span> ?
        </h3>
      ) : (
        <h3>Confirm the board deleting</h3>
      )}
    </Confirm>
  );
};
export default DeleteBoardModal;
