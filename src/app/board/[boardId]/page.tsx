import Board from '@/components/Board/Board';

import { notFound } from 'next/navigation';
import { boardService } from '@/libs/boards.service';
import { dbConnect } from '@/libs/db/connect';

type Props = {
  params: {
    boardId: string;
  };
};

export default async function SingleBoard({ params: { boardId } }: Props) {
  await dbConnect();

  // TODO check if the user have access rights for getting this board

  const board = await boardService.getSafeBoardById(boardId);

  if (!board) {
    return notFound();
  }

  return <Board board={board} />;
}
