import Confirm from '@/modules/confirm/Confirm';

import {
  getSetBoardsState,
  getSetModal,
  getSetToastState,
} from '@/context/stateManager';
import { ServerResponseError } from '@/libs/error.service';
import { TDeleteModalData } from '@/types/state';
import { api } from '@/utils/api/api';
import { useSetAtom } from 'jotai';
import { useCallback, useState } from 'react';

import type { SyntheticEvent } from 'react';

type DeleteBoardFormProps = TDeleteModalData;

const DeleteBoardForm: React.FC<DeleteBoardFormProps> = ({
  entitiId,
  children,
}) => {
  const setModal = useSetAtom(getSetModal);
  const setBoards = useSetAtom(getSetBoardsState);
  const setToast = useSetAtom(getSetToastState);
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = useCallback((boardId: string) => {
    setBoards((state) => {
      const result = state.filter((item) => item.id !== boardId);

      return result;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accept = useCallback(
    async (e: SyntheticEvent<HTMLElement>) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await api.delete('board', {
          boardId: entitiId,
        });

        refreshData(entitiId);

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
      } finally {
        setIsLoading(false);
      }
    },
    [entitiId, refreshData, setModal, setToast],
  );

  const decline = useCallback(() => {
    setModal({
      isOpen: false,
      window: null,
    });
  }, [setModal]);

  return (
    <Confirm accept={accept} decline={decline} isLoading={isLoading}>
      {children ? children : <h3>Confirm the board deleting</h3>}
    </Confirm>
  );
};

export default DeleteBoardForm;
