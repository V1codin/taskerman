'use client';

import Members from './components/Members';
import Heading from './components/Heading';

import { IBoard } from '@/models/boards';

type BoardProps = {
  board: IBoard;
};

const Board: React.FC<BoardProps> = ({ board }) => {
  const { owner, members } = board;

  return (
    <>
      <Heading boardTitle={board.title} />

      <Members members={members} ownerId={owner._id} />
    </>
  );
};

export default Board;
