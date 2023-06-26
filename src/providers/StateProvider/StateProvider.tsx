'use client';

import { Provider, createStore } from 'jotai';
import {
  getSetBoardsState,
  getSetUserStateAtom,
  getSetNotificationsState,
} from '@/context/stateManager';

import type { PropsWithChildren } from 'react';
import type { IBoard } from '@/models/boards';
import type { SessionUser } from '@/types/db';
import type { INotification } from '@/models/notifications';

type StateProviderProps = {
  user: SessionUser | null;
  boards: IBoard[];
  notifications: INotification[];
};

const StateProvider: React.FC<PropsWithChildren<StateProviderProps>> = ({
  children,
  user,
  boards,
  notifications,
}) => {
  const store = createStore();
  store.set(getSetUserStateAtom, user);
  store.set(getSetBoardsState, boards);
  store.set(getSetNotificationsState, notifications);

  return <Provider store={store}>{children}</Provider>;
};

export default StateProvider;
