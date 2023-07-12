'use client';

import { atom, WritableAtom } from 'jotai';
import { EMPTY_TOAST, DEFAULT_MODAL_STATE } from '@/utils/constants';

import type { ToastProps } from '@/types/helpers';
import type { IModal, TProfileActiveSub } from '@/types/state';
import type { SessionUser, TBoardNS } from '@/types/db';
import type { TNotification } from '@/libs/db/postgres/schemas/types';
import type { TBoard } from '@/libs/db/postgres/schemas/types';

export const userStateAtom = atom<SessionUser | null>(null);
export const getSetUserStateAtom: WritableAtom<
  SessionUser | null,
  [
    update:
      | SessionUser
      | ((prevValue: SessionUser | null) => SessionUser | null)
      | null,
  ],
  void
> = atom(
  (get) => get(userStateAtom),
  (_, set, update) => {
    if (typeof update === 'function') {
      set(userStateAtom, (prev) => update(prev));
    } else {
      set(userStateAtom, update);
    }
  },
);

export const userDisplayNameAtom = atom(
  (get) => {
    const val = get(userStateAtom);
    if (val) {
      return val['displayName'];
    }

    return '';
  },
  (get, set, update: string) => {
    const val = get(userStateAtom);
    if (val) {
      val['displayName'] = update;
      set(userStateAtom, {
        ...val,
      });
    }
  },
);

export const userImageAtom = atom(
  (get) => {
    const val = get(userStateAtom);
    if (val) {
      return val['imageURL'];
    }

    return '';
  },
  (get, set, update: string) => {
    const val = get(userStateAtom);
    if (val) {
      val['imageURL'] = update;
      set(userStateAtom, {
        ...val,
      });
    }
  },
);

export const initialProfileSub: TProfileActiveSub = {
  coords: 0,
  index: 0,
};
export const getSetProfileSubsActiveAtom: WritableAtom<
  TProfileActiveSub,
  [update: TProfileActiveSub],
  void
> = atom(initialProfileSub, (_, set, newValue) => {
  set(getSetProfileSubsActiveAtom, newValue);
});

export const boardsStateAtom = atom<TBoard[]>([]);
export const getSetBoardsState = atom<
  TBoard[],
  [update: TBoard | TBoard[] | ((prevValue: TBoard[]) => TBoard[])],
  void
>(
  (get) => get(boardsStateAtom),
  (get, set, update) => {
    const prev = get(boardsStateAtom);

    if (Array.isArray(update)) {
      if (!update.length) return;

      set(boardsStateAtom, update);
    } else if (typeof update === 'function') {
      set(boardsStateAtom, () => {
        const result = update(prev);

        return result;
      });
    } else {
      set(boardsStateAtom, () => {
        const result = [...prev, update];

        return result;
      });
    }
  },
);

export const singleBoardStateAtom = atom<TBoardNS.ISingleBoard>({
  board: null,
});
export const getSetSingleBoardState: WritableAtom<
  TBoardNS.ISingleBoard,
  [update: TBoardNS.ISingleBoard],
  void
> = atom(
  (get) => get(singleBoardStateAtom),
  (_, set, update) => {
    set(singleBoardStateAtom, update);
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
  [update: IModal<true> | IModal<false>],
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

export const notificationAtom = atom<TNotification[]>([]);
export const getSetNotificationsState: WritableAtom<
  TNotification[],
  [
    update:
      | TNotification
      | TNotification[]
      | ((prevValue: TNotification[]) => TNotification[]),
  ],
  void
> = atom(
  (get) => get(notificationAtom),
  (get, set, update) => {
    const prev = get(notificationAtom);

    if (Array.isArray(update)) {
      if (!update.length) return;

      set(notificationAtom, update);
    } else if (typeof update === 'function') {
      set(notificationAtom, () => {
        const result = update(prev);

        return result;
      });
    } else {
      set(notificationAtom, () => {
        const result = [...prev, update];

        return result;
      });
    }
  },
);
