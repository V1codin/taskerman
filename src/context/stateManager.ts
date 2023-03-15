import { atom } from 'jotai';

export const isAuthenticatedAtom = atom(false);
export const readAuthenticated = atom((get) => get(isAuthenticatedAtom));
export const readWriteAuthenticated = atom(
  (get) => get(isAuthenticatedAtom),
  (_, set, update: boolean) => {
    set(isAuthenticatedAtom, update);
  },
);
