import DropDown from '@/modules/dropdown/DropDown';
import DropDownElement from './DropDownElement';
import CloseButton from '@/modules/button/CloseButton';
import cls from 'classnames';
import ConfirmButton from '@/modules/button/ConfirmButton';

import { NOTIFICATION_TEXT_FORMAT_REGEX } from '@/utils/constants';
import { useAtom, useSetAtom } from 'jotai';
import {
  getSetModal,
  getSetNotificationsState,
  getSetToastState,
} from '@/context/stateManager';
import { useCallback } from 'react';
import { api } from '@/utils/api/api';

import type { MutableRefObject } from 'react';
import type { INotification } from '@/models/notifications';

type NotificationDropDownProps = {
  closeDropDown: () => void;
  containerRef: MutableRefObject<HTMLElement | null>;
};

const NotificationDropDown: React.FC<NotificationDropDownProps> = ({
  closeDropDown,
}) => {
  const [notes, setNotes] = useAtom(getSetNotificationsState);
  const setModal = useSetAtom(getSetModal);
  const setToast = useSetAtom(getSetToastState);

  const decline = useCallback(
    (note: INotification) => {
      return async () => {
        const noteType = note.type;

        if (noteType === 'info') {
          try {
            const result = await api.delete('notification', {
              id: note._id,
            });

            setNotes((prev) =>
              prev.filter(({ _id }) => _id !== result.removedNoteId),
            );
          } catch (e) {
            setToast({
              timeout: 3500,
              typeClass: 'conflict',
              message: (e as Error).message || 'Something went wrong',
            });
          }
          return;
        }
        if (noteType === 'option') {
          try {
            setModal({
              isOpen: true,
              window: {
                data: {
                  entitiId: note._id,
                  entity: 'notification_decline',
                },
                type: 'delete',
                view: 'delete_notification',
              },
            });
          } catch (e) {
            setToast({
              timeout: 3500,
              typeClass: 'conflict',
              message: (e as Error).message || 'Something went wrong',
            });
          }
          return;
        }
      };
    },
    [setModal, setNotes, setToast],
  );

  const accept = useCallback((note: INotification) => {
    return async () => {
      try {
        const result = await api.delete('notification_confirm', {
          id: note._id,
        });

        setNotes((prev) =>
          prev.filter(({ _id }) => _id !== result.removedNoteId),
        );
      } catch (e) {
        setToast({
          timeout: 3500,
          typeClass: 'conflict',
          message: (e as Error).message || 'Something went wrong',
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DropDown
      close={closeDropDown}
      dropDownType="note"
      heading="Notifications"
      containerClassNames="min-w-[450px] mobile:min-w-[90vw]"
      listClassNames="max-h-64 overflow-auto"
    >
      {notes.map((item) => {
        const text = item.text.replace(
          NOTIFICATION_TEXT_FORMAT_REGEX,
          `<span class='${item.priority}'>$1</span>`,
        );

        return (
          <DropDownElement
            key={item._id}
            classNames={cls('p-1 text-base relative', {
              'border-b border-pink': item.priority === 'conflict',
              'border-b border-orange': item.priority === 'warning',
              'border-b border-pale-green': item.priority === 'notification',
            })}
          >
            <CloseButton
              click={decline(item)}
              isBackgrounded={true}
              classNames="!p-1 !w-6 !h-6 !top-1"
              iconAttributes={{
                width: 13,
                height: 13,
              }}
            />
            {/* 
            // ? dangerouslySetInnerHTML can be using because
              item.text was created on the server and depends only on server data
            */}
            <p
              dangerouslySetInnerHTML={{ __html: text }}
              className="max-w-[90%]"
            ></p>
            {item.type === 'option' && (
              <ConfirmButton
                click={accept(item)}
                isBackgrounded={true}
                classNames="bottom-3 right-3 !w-6 !h-6"
              />
            )}
          </DropDownElement>
        );
      })}
    </DropDown>
  );
};

export { NotificationDropDown };
