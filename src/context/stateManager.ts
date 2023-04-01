import { atom, WritableAtom } from 'jotai';
import { ToastProps } from '@/types/helpers';
import { EMPTY_TOAST, DEFAULT_MODAL_STATE } from '@/utils/constants';
import { IModal } from '@/types/state';
import { TBoard } from '@/types/db';

export const boardsStateAtom = atom<TBoard[]>([]);
export const getSetBoardsState: WritableAtom<
  TBoard[],
  [update: TBoard | TBoard[]],
  void
> = atom(
  (get) => get(boardsStateAtom),
  (get, set, update) => {
    if (Array.isArray(update)) {
      set(boardsStateAtom, update);
    } else {
      const arr = get(boardsStateAtom);
      arr.push(update);
      set(boardsStateAtom, arr);
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
  [update: IModal<boolean>, callback?: () => void],
  void
> = atom(
  (get) => get(modalAtom),
  (_, set, update, callback) => {
    set(modalAtom, update);
    if (typeof callback === 'function') {
      callback();
    }
  },
);
