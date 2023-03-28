import { atom, WritableAtom } from 'jotai';
import { ToastProps } from '../../types/helpers';
import { EMPTY_TOAST } from '@/utils/constants';
import { AuthModal } from '../../types/state';

export const toastStateAtom = atom<ToastProps>(EMPTY_TOAST);
export const getSetToastState = atom(
  (get) => get(toastStateAtom),
  (_, set, update: ToastProps) => {
    set(toastStateAtom, update);
  },
);

const defaultAuthModalState: AuthModal<false> = {
  isOpen: false,
  view: '',
};

export const authModalAtom = atom<AuthModal<boolean>>(defaultAuthModalState);
export const getSetAuthModal: WritableAtom<
  AuthModal<boolean>,
  [update: AuthModal<true> | AuthModal<false>],
  void
> = atom(
  (get) => get(authModalAtom),
  (_, set, update) => {
    set(authModalAtom, update);
  },
);
