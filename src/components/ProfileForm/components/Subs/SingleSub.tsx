'use client';

// @ts-ignore
import boardIcon from '@/assets/board_colored.svg?url';
// @ts-ignore
import binIcon from '@/assets/bin.svg?url';
import SubButtons from './SubButtons';
import cls from 'classnames';
import Link from 'next/link';

import {
  DeleteBoardMessage,
  UnsubscribeBoardMessage,
} from '@/components/RemoveBoardMessages/RemoveBoardMessages';
import { getSetModal, userStateAtom } from '@/context/stateManager';
import { isLink } from '@/utils/helpers';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useRef } from 'react';

import { BOARD_SUBS_TITLE_SLICE_INDEX } from '@/utils/constants';

import type { TBoard } from '@/libs/db/postgres/schemas/types';

type SingleSubProps = {
  board: TBoard;
  classNames?: string;
};

const SingleSub: React.FC<SingleSubProps> = ({ board, classNames }) => {
  const user = useAtomValue(userStateAtom);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const setModal = useSetAtom(getSetModal);

  const title =
    board.title.slice(0, BOARD_SUBS_TITLE_SLICE_INDEX) +
    `${board.title.length >= BOARD_SUBS_TITLE_SLICE_INDEX ? '...' : ''}`;

  const bgChecker = isLink(board.bg);

  const openDeleteBoardModal = useCallback(
    ({ owner, id, title }: TBoard) => {
      const modalMessage =
        user?.id === owner.id
          ? DeleteBoardMessage()
          : UnsubscribeBoardMessage();

      setModal({
        isOpen: true,
        window: {
          type: 'delete',
          view: 'delete_board',
          data: {
            entitiId: id,
            children: (
              <h3>
                {modalMessage} - <p style={{ color: '#55d725' }}>{title}</p>
              </h3>
            ),
            entity: 'board',
          },
        },
      });
    },
    [setModal, user?.id],
  );

  const style = bgChecker
    ? {
        backgroundImage: `url(${board.bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    : { background: board.bg };

  return (
    <div
      key={board.id}
      className={cls(
        `w-[465px] laptop:mt-2 laptop:w-full 
      laptop:flex
      laptop:flex-col
      laptop:items-center
      laptop:overflow-visible
      laptop:after:content-['']
      laptop:after:block
      laptop:after:w-[105%]
      laptop:after:h-4
      laptop:after:border-b
      laptop:after:border-l
      laptop:after:border-r
    laptop:after:border-pale-blue`,
        classNames,
      )}
    >
      <Link href={`/board/${board.id}`} className="flex self-start">
        <h4
          className="rounded-md bg-[#333] 
        text-white font-bold px-3 py-1 w-full
        hover:text-pale-blue
        hover:bg-monokai
        laptop:text-left 
        laptop:w-fit
        laptop:self-start
        "
          id={board.id}
          title={`Go to the board (${board.title})`}
        >
          {title}
        </h4>
      </Link>
      <div
        className="relative rounded 
        mx-auto my-1 w-full 
        min-h-[200px] laptop:min-h-[45px]
        "
        ref={containerRef}
        style={{
          ...style,
        }}
      >
        <SubButtons
          board={board}
          containerRef={containerRef}
          openDeleteBoardModal={openDeleteBoardModal}
        />
      </div>
    </div>
  );
};

export default SingleSub;
