'use client';

import { Members } from './components/Members';
import { Heading } from './components/Heading';

import type { TBoard } from '@/libs/db/postgres/schemas/types';

type BoardProps = {
  board: TBoard;
};

const Board: React.FC<BoardProps> = ({ board }) => {
  const { owner, members, title, id } = board;

  return (
    <>
      <Heading boardTitle={title} boardId={id} />
      <Members boardMembers={members} ownerId={owner.id} />

      <div className="mt-4 block [&>div]:mt-3">
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
        <div className="w-full h-8 border border-blue"></div>
      </div>
    </>
  );
};

export default Board;
