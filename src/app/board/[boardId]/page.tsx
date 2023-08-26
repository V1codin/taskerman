import Board from '@/components/Board/Board';

import { notFound } from 'next/navigation';
import { boardService } from '@/libs/boards.service';
import { dbConnect } from '@/libs/db/connect';
import { cookies } from 'next/headers';
import { authService } from '@/libs/auth.service';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    boardId: string;
  };
};

export default async function SingleBoard({ params: { boardId } }: Props) {
  await dbConnect();

  // TODO take out the logic

  const cookieStorage = cookies();

  const sessionToken = cookieStorage.get(AUTH_TOKEN_COOKIE_NAME);
  const sessionUser = await authService.getSessionUser(
    sessionToken?.value || '',
  );

  if (!sessionUser) {
    redirect('/login');
  }

  const board = await boardService.getSafeBoardById(boardId);

  if (!board) {
    return notFound();
  }

  const isValidUser = boardService.isValidIssuer(sessionUser.id, board);
  if (!isValidUser) {
    return (
      <h2 className="bg-monokai px-3 py-1 w-[fit-content] text-orange">
        You have no access for the board
      </h2>
    );
  }

  return <Board board={board} />;
}
