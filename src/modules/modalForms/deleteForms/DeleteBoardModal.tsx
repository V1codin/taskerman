import Confirm from '@/modules/confirm/Confirm';

import { getSetBoardsState, getSetModal } from '@/context/stateManager';
import { TDeleteModalData } from '@/types/state';
import { deleteBoard } from '@/utils/api/boards';
import { useSetAtom } from 'jotai';
import { SyntheticEvent, useCallback } from 'react';
import { ServerResponseError } from '@/libs/error.service';
import { useToast } from '@/hooks/hooks';

type DeleteBoardModalProps = TDeleteModalData;

const DeleteBoardModal: React.FC<DeleteBoardModalProps> = ({
  id,
  children,
}) => {
  const setModal = useSetAtom(getSetModal);
  const setBoards = useSetAtom(getSetBoardsState);
  const { setToast } = useToast();

  const refreshData = useCallback(
    (boardId: string) => {
      setBoards((state) => {
        const result = state.filter((item) => item._id !== boardId);

        return result;
      });
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
        if (e instanceof ServerResponseError) {
          setToast({
            message: e.message,
            typeClass: 'conflict',
            timeout: 3500,
          });

          return;
        }

        setToast({
          message: 'Unexpected error',
          typeClass: 'conflict',
        });
      }
    },
    [id, refreshData, setModal, setToast],
  );

  const decline = useCallback(() => {
    setModal({
      isOpen: false,
      window: null,
    });
  }, [setModal]);

  return (
    <Confirm accept={accept} decline={decline}>
      {children ? children : <h3>Confirm the board deleting</h3>}
    </Confirm>
  );
};

export default DeleteBoardModal;
