import BoardHeader from '@/components/SingleBoard/components/BoardHeader/BoardHeader';
import AddListForm from '@/components/SingleBoard/components/AddListForm/AddListForm';

import { GetServerSidePropsContext } from 'next';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { dbAdapter } from '../api/auth/[...nextauth]';
import { getBoardById } from '@/utils/api/boards';
import { TListNS } from '@/types/db';
import { IBoard } from '@/models/boards';

type Props = {
  data: {
    board: IBoard;
    lists: TListNS.TList[];
  } | null;
};

export default function SingleBoard({ data }: Props) {
  if (!data) {
    return <p>Wrong board or you have no access to the board</p>;
  }

  const { board, lists } = data;

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
          data: null,
        },
      };
    }
  }

  return {
    props: {
      board: null,
    },
  };
}
