'use client';

import { Provider, createStore } from 'jotai';
import {
  getSetBoardsState,
  getSetUserStateAtom,
  getSetNotificationsState,
} from '@/context/stateManager';

import type { PropsWithChildren } from 'react';
import type { SessionUser } from '@/types/db';
import type { TNotification, TBoard } from '@/libs/db/postgres/schemas/types';

type StateProviderProps = {
  user: SessionUser | null;
  boards: TBoard[];
  notifications: TNotification[];
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
