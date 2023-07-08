'use client';

import BoardCard from './BoardCard';

import { useAtomValue, useSetAtom } from 'jotai';
import {
  boardsStateAtom,
  getSetModal,
  userStateAtom,
} from '@/context/stateManager';
import {
  DeleteBoardMessage,
  UnsubscribeBoardMessage,
} from '../RemoveBoardMessages/RemoveBoardMessages';
import { isLink } from '@/utils/helpers';
import { useCallback } from 'react';

import type { TBoard } from '@/libs/db/postgres/schemas/types';

type BoardContainerProps = {};

const BoardsContainer: React.FC<BoardContainerProps> = () => {
  const boards = useAtomValue(boardsStateAtom);
  const user = useAtomValue(userStateAtom);
  const setModal = useSetAtom(getSetModal);

  const deleteBoard = useCallback(
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

  if (!boards.length) return null;

  return (
    <>
      {boards.map((board, index) => {
        const bgChecker = isLink(board.bg);

        const boardProps = {
          ...board,
          bgChecker,
        };
        return (
          <BoardCard
            {...boardProps}
            deleteBoard={() => deleteBoard(board)}
            key={Math.random() * 100 + index + board.id}
          />
        );
      })}
    </>
  );
};

export default BoardsContainer;
