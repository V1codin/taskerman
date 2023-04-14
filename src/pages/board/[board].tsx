import BoardHeader from '@/components/SingleBoard/components/BoardHeader/BoardHeader';
import AddListForm from '@/components/SingleBoard/components/AddListForm/AddListForm';

import { GetServerSidePropsContext } from 'next';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { dbAdapter } from '../api/auth/[...nextauth]';
import { getBoardById } from '@/utils/api/boards';
import { TBoardNS } from '@/types/db';
import { useBodyColor } from '@/hooks/hooks';
import { useSetAtom } from 'jotai';
import { getSetsingleBoardState } from '@/context/stateManager';
import { useLayoutEffect } from 'react';

type Props = {
  data: TBoardNS.ISingleBoard;
};

export default function SingleBoard({ data }: Props) {
  const { board, lists } = data;
  useBodyColor(board?.bg);

  const setBoard = useSetAtom(getSetsingleBoardState);

  // ? useHydrateAtoms wouldn't fire after router.replace(router.asPath)
  // ?  so we need to update client store by ourself
  useLayoutEffect(() => {
    if (data.board) {
      setBoard(data);
    }
  }, [data, data.board, setBoard]);

  if (!board) {
    return (
      <h1 style={{ textAlign: 'center' }}>
        Wrong board or you have no access to the board
      </h1>
    );
  }

  return (
    <section className="boards">
      <BoardHeader
        title={board.title}
        boardMembers={board.members}
        owner={board.owner}
      />

      <div className="container">
        {/* <ListsWrapper _boardId={id} /> */}
        <AddListForm boardId={board._id} />
      </div>
    </section>
  );
}

export async function getServerSideProps({
  req,
  resolvedUrl,
}: GetServerSidePropsContext) {
  const token = req.cookies[AUTH_TOKEN_COOKIE_NAME];
  const boardId = resolvedUrl.split('/').pop();

  const sessionAndUser = await dbAdapter.getSessionAndUser(token || '');

  if (sessionAndUser) {
    try {
      const response = await getBoardById(boardId || '', token);

      return {
        props: {
          data: response.data,
        },
      };
    } catch (e) {
      return {
        props: {
          data: {
            board: null,
            lists: [],
          },
        },
      };
    }
  }

  return {
    props: {
      data: {
        board: null,
        lists: [],
      },
    },
  };
}
