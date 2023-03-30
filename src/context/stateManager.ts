import { atom, WritableAtom } from 'jotai';
import { ToastProps } from '../../types/helpers';
import { EMPTY_TOAST } from '@/utils/constants';
import { IModal } from '../../types/state';

export const toastStateAtom = atom<ToastProps>(EMPTY_TOAST);
export const getSetToastState = atom(
  (get) => get(toastStateAtom),
  (_, set, update: ToastProps) => {
    set(toastStateAtom, update);
  },
);

const defaultModalState: IModal<false> = {
  isOpen: false,
  window: null,
};

export const modalAtom = atom<IModal<boolean>>(defaultModalState);
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
