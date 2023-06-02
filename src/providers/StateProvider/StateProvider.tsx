'use client';

import { Provider, createStore } from 'jotai';
import { getSetBoardsState, getSetUserStateAtom } from '@/context/stateManager';

import type { PropsWithChildren } from 'react';
import type { IBoard } from '@/models/boards';
import type { SessionUser } from '@/types/db';

type StateProviderProps = {
  user: SessionUser | null;
  boards: IBoard[];
};

const StateProvider: React.FC<PropsWithChildren<StateProviderProps>> = ({
  children,
  user,
  boards,
}) => {
  const store = createStore();
  store.set(getSetUserStateAtom, user);
  store.set(getSetBoardsState, boards);

  return <Provider store={store}>{children}</Provider>;
};

export default StateProvider;
