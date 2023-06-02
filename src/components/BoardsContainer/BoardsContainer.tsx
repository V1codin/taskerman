'use client';

import cls from 'classnames';
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

import type { IBoard } from '@/models/boards';

const defaultContainerClasses = `flex flex-wrap mx-auto my-0 bg-none`;

type BoardContainerProps = {};

const BoardsContainer: React.FC<BoardContainerProps> = () => {
  const boards = useAtomValue(boardsStateAtom);
  const user = useAtomValue(userStateAtom);
  const setModal = useSetAtom(getSetModal);

  const deleteBoard = useCallback(
    ({ owner, _id, title }: IBoard) => {
      const modalMessage =
        user?._id === owner._id
          ? DeleteBoardMessage()
          : UnsubscribeBoardMessage();

      setModal({
        isOpen: true,
        window: {
          type: 'delete',
          view: 'delete_board',
          data: {
            id: _id,
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
    [setModal, user?._id],
  );

  if (!boards.length) return null;

  return (
    <div className={cls(defaultContainerClasses)}>
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
            key={Math.random() * 100 + index + board._id}
          />
        );
      })}
    </div>
  );
};

export default BoardsContainer;
