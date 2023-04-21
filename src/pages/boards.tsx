import BoardsContainer from '@/components/BoardsContainer/BoardsContainer';

import { IBoard } from '@/models/boards';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { GetServerSidePropsContext } from 'next/types';
import { dbAdapter } from './api/auth/[...nextauth]';
import { getBoards } from '@/utils/api/boards';
import { boardsStateAtom, getSetBoardsState } from '@/context/stateManager';
import { useAtomValue } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

type BoardsProps = {
  boards: IBoard[];
};

export default function Boards({ boards }: BoardsProps) {
  useHydrateAtoms([[getSetBoardsState, boards]]);

  const localBoards = useAtomValue(boardsStateAtom);

  return (
    <>{localBoards.length > 0 && <BoardsContainer boards={localBoards} />}</>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const token = req.cookies[AUTH_TOKEN_COOKIE_NAME];

  const sessionAndUser = await dbAdapter.getSessionAndUser(token || '');

  if (sessionAndUser) {
    try {
      const response = await getBoards(sessionAndUser.user.id, token);

      return {
        props: {
          boards: response.data,
        },
      };
    } catch (e) {
      return {
        props: {
          boards: [],
        },
      };
    }
  }

  return {
    props: {
      boards: [],
    },
  };
}
