import { atom, WritableAtom } from 'jotai';
import { ToastProps } from '@/types/helpers';
import { EMPTY_TOAST, DEFAULT_MODAL_STATE } from '@/utils/constants';
import { IModal } from '@/types/state';
import { IBoard } from '@/models/boards';

export const boardsStateAtom = atom<IBoard[]>([]);
export const getSetBoardsState: WritableAtom<
  IBoard[],
  [update: IBoard | IBoard[] | ((prevValue: IBoard[]) => IBoard[])],
  void
> = atom(
  (get) => get(boardsStateAtom),
  (_, set, update) => {
    if (Array.isArray(update)) {
      set(boardsStateAtom, update);
    } else if (typeof update === 'function') {
      set(boardsStateAtom, (prev) => update(prev));
    } else {
      set(boardsStateAtom, (prev) => {
        prev.push(update);

        return prev;
      });
    }
  },
);

export const toastStateAtom = atom<ToastProps>(EMPTY_TOAST);
export const getSetToastState: WritableAtom<
  ToastProps,
  [updade: ToastProps],
  void
> = atom(
  (get) => get(toastStateAtom),
  (_, set, update) => {
    set(toastStateAtom, update);
  },
);

export const modalAtom = atom<IModal<boolean>>(DEFAULT_MODAL_STATE);
export const getSetModal: WritableAtom<
  IModal<boolean>,
  [update: IModal<boolean>],
  void
> = atom(
  (get) => get(modalAtom),
  (_, set, update) => {
    set(modalAtom, update);
  },
);

export const confirmAtom = atom<boolean | null>(null);
export const getSetConfirm: WritableAtom<
  boolean | null,
  [update: boolean, callback?: () => void],
  void
> = atom(
  (get) => get(confirmAtom),
  (_, set, update) => {
    set(confirmAtom, update);
  },
);
