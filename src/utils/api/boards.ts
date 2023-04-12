import fetcher from './fetcher';

import { TBoardNS } from '@/types/db';
import { API_BOARDS_URL, API_SINGLE_BOARD_URL, BASE_URL } from '../constants';
import { IBoard } from '@/models/boards';

export const getBoards = (username: string, token: string | undefined) => {
  return fetcher<{ data: IBoard[] }>(
    `${BASE_URL}${API_BOARDS_URL}?username=${username}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const createBoard = (board: TBoardNS.TCreatingBoard) => {
  return fetcher<{ data: IBoard }>(`${BASE_URL}${API_BOARDS_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(board),
  });
};

export const deleteBoard = (boardId: string) => {
  return fetcher<{ data: string }>(`${BASE_URL}${API_BOARDS_URL}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      boardId,
    }),
  });
};

export const getBoardById = (boardId: string, token: string | undefined) => {
  return fetcher<{ data: IBoard }>(
    `${BASE_URL}${API_SINGLE_BOARD_URL}?boardId=${boardId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
