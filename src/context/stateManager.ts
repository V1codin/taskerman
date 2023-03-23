import { atom, WritableAtom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import { ToastProps } from '../../types/helpers';
import { EMPTY_TOAST } from '@/utils/constants';
import { TResponseLoginData } from '@/pages/api/auth/login';
import { AuthModal } from '../../types/state';

export const toastStateAtom = atom<ToastProps>(EMPTY_TOAST);
export const getSetToastState = atom(
  (get) => get(toastStateAtom),
  (_, set, update: ToastProps) => {
    set(toastStateAtom, update);
  },
);

export const loggedUserAtom = atom<TResponseLoginData<boolean>>({
  isLoggedIn: false,
  data: null,
  error: null,
});
export const getLoggedUserAtom = atom((get) => get(loggedUserAtom));
export const getSetLoggedUserAtom = atom(
  (get) => get(loggedUserAtom),
  (_, set, update: TResponseLoginData<boolean>) => {
    set(loggedUserAtom, update);
  },
);

export const isAuthenticatedAtom = focusAtom(loggedUserAtom, (optic) =>
  optic.prop('isLoggedIn'),
);
export const getAuthenticated = atom((get) => get(isAuthenticatedAtom));
export const getSetAuthenticated = atom(
  (get) => get(isAuthenticatedAtom),
  (_, set, update: boolean) => {
    set(isAuthenticatedAtom, update);
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
