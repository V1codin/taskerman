'use client';

import Members from './components/Members';
import Heading from './components/Heading';

import { useMemo } from 'react';

import type { IBoard } from '@/models/boards';

type BoardProps = {
  board: IBoard;
};

const Board: React.FC<BoardProps> = ({ board }) => {
  const { owner, members } = board;
  const filteredMembers = useMemo(() => {
    return members.filter((item) => item.isPending !== true);
  }, [members]);

  return (
    <>
      <Heading boardTitle={board.title} />
      <Members members={filteredMembers} ownerId={owner._id} />

      <div className="mt-4 flex items-center justify-between flex-wrap">
        <div className="w-1/3 h-48 border border-blue"></div>
        <div className="w-1/3 h-48 border border-blue"></div>
        <div className="w-1/3 h-48 border border-blue"></div>
        <div className="w-1/3 h-48 border border-blue"></div>
      </div>
    </>
  );
};

export default Board;
