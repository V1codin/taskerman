'use client';

import Members from './components/Members';
import Heading from './components/Heading';

import { useSetAtom } from 'jotai';
import { getSetSingleBoardState } from '@/context/stateManager';

import type { IBoard } from '@/models/boards';
import { useEffect } from 'react';

type BoardProps = {
  board: IBoard;
};

const Board: React.FC<BoardProps> = ({ board }) => {
  const { owner, members } = board;
  const setSingleBoard = useSetAtom(getSetSingleBoardState);

  useEffect(() => {
    setSingleBoard({
      board,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Heading boardTitle={board.title} />
      <Members members={members} ownerId={owner._id} />

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
