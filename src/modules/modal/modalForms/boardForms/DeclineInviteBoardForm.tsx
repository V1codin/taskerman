import Confirm from '@/modules/confirm/Confirm';

import {
  getSetModal,
  getSetNotificationsState,
  getSetToastState,
} from '@/context/stateManager';
import { ServerResponseError } from '@/libs/error.service';
import { TDeleteModalData } from '@/types/state';
import { api } from '@/utils/api/api';
import { useSetAtom } from 'jotai';
import { useCallback, useState } from 'react';

import type { SyntheticEvent } from 'react';

type DeclineInviteBoardFormProps = TDeleteModalData;

const DeclineInviteBoardForm: React.FC<DeclineInviteBoardFormProps> = ({
  entitiId,
  children,
}) => {
  const setModal = useSetAtom(getSetModal);
  const setToast = useSetAtom(getSetToastState);
  const setNotes = useSetAtom(getSetNotificationsState);
  const [isLoading, setIsLoading] = useState(false);

  const accept = useCallback(
    async (e: SyntheticEvent<HTMLElement>) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const result = await api.delete('notification_decline', {
          id: entitiId,
        });

        setNotes((prev) => {
          return prev.filter(({ id }) => id !== result.removedNoteId);
        });

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
    [entitiId, setModal, setNotes, setToast],
  );

  const decline = useCallback(() => {
    setModal({
      isOpen: false,
      window: null,
    });
  }, [setModal]);

  return (
    <Confirm accept={accept} decline={decline} isLoading={isLoading}>
      {children ? children : <h3>Decline the invite?</h3>}
    </Confirm>
  );
};

export default DeclineInviteBoardForm;
