import { atom, WritableAtom } from 'jotai';
import { ToastProps } from '@/types/helpers';
import {
  EMPTY_TOAST,
  DEFAULT_MODAL_STATE,
  PROFILE_SUBS_SLIDE_WIDTH,
  SUBS_SLIDE_HALF,
} from '@/utils/constants';
import { IModal, TProfileActiveSub } from '@/types/state';
import { IBoard } from '@/models/boards';
import { SessionUser, TBoardNS } from '@/types/db';

export const userStateAtom = atom<SessionUser | null>(null);
export const getSetUserStateAtom: WritableAtom<
  SessionUser | null,
  [
    update:
      | SessionUser
      | ((prevValue: SessionUser | null) => SessionUser)
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

const initialProfileSub: TProfileActiveSub = {
  containerWidth: 0,
  coords: 0,
  index: -1,
};
export const getSetProfileSubsActiveAtom: WritableAtom<
  TProfileActiveSub,
  [update: TProfileActiveSub],
  void
> = atom(initialProfileSub, (_, set, newValue) => {
  set(getSetProfileSubsActiveAtom, newValue);
});

export const boardsStateAtom = atom<IBoard[]>([]);
export const getSetBoardsState = atom<
  IBoard[],
  [update: IBoard | IBoard[] | ((prevValue: IBoard[]) => IBoard[])],
  void
>(
  (get) => get(boardsStateAtom),
  (get, set, update) => {
    const prev = get(boardsStateAtom);

    if (Array.isArray(update)) {
      set(boardsStateAtom, update);
      const subsNumber = update.length;
      const containerWidth = subsNumber * PROFILE_SUBS_SLIDE_WIDTH;
      const toScroll =
        subsNumber % 2 !== 0
          ? Math.trunc(containerWidth / 2 / PROFILE_SUBS_SLIDE_WIDTH) *
            PROFILE_SUBS_SLIDE_WIDTH
          : subsNumber === 2
          ? SUBS_SLIDE_HALF
          : containerWidth / 2 - SUBS_SLIDE_HALF;

      set(getSetProfileSubsActiveAtom, {
        coords: toScroll,
        index: 0,
        containerWidth,
      });
    } else if (typeof update === 'function') {
      set(boardsStateAtom, () => {
        const result = update(prev);

        const subsNumber = result.length;
        const containerWidth = subsNumber * PROFILE_SUBS_SLIDE_WIDTH;
        const toScroll =
          subsNumber % 2 !== 0
            ? Math.trunc(containerWidth / 2 / PROFILE_SUBS_SLIDE_WIDTH) *
              PROFILE_SUBS_SLIDE_WIDTH
            : subsNumber === 2
            ? SUBS_SLIDE_HALF
            : containerWidth / 2 - SUBS_SLIDE_HALF;

        set(getSetProfileSubsActiveAtom, {
          coords: toScroll,
          index: 0,
          containerWidth,
        });

        return result;
      });
    } else {
      set(boardsStateAtom, () => {
        const result = [...prev, update];

        const subsNumber = result.length;
        const containerWidth = subsNumber * PROFILE_SUBS_SLIDE_WIDTH;
        const toScroll =
          subsNumber % 2 !== 0
            ? Math.trunc(containerWidth / 2 / PROFILE_SUBS_SLIDE_WIDTH) *
              PROFILE_SUBS_SLIDE_WIDTH
            : subsNumber === 2
            ? SUBS_SLIDE_HALF
            : containerWidth / 2 - SUBS_SLIDE_HALF;

        set(getSetProfileSubsActiveAtom, {
          coords: toScroll,
          index: 0,
          containerWidth,
        });

        return result;
      });
    }
  },
);

export const singleBoardStateAtom = atom<TBoardNS.ISingleBoard>({
  board: null,
  lists: [],
});
export const getSetsingleBoardState: WritableAtom<
  TBoardNS.ISingleBoard,
  [updade: TBoardNS.ISingleBoard],
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
