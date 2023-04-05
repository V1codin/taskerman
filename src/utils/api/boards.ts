import fetcher from '@/libs/fetcher';

import { TBoard, TCreatingBoard } from '@/types/db';
import { API_BOARDS_URL, API_SINGLE_BOARD_URL, BASE_URL } from '../constants';
import { TRawUserBoard, TRawUserBoards } from '@/libs/boards.service';

export const getBoards = (username: string, token: string | undefined) => {
  return fetcher<{ data: TRawUserBoards }>(
    `${BASE_URL}${API_BOARDS_URL}?username=${username}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const createBoard = (board: TCreatingBoard) => {
  return fetcher<{ data: TRawUserBoard }>(`${BASE_URL}${API_BOARDS_URL}`, {
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
  return fetcher<{ data: TBoard }>(
    `${BASE_URL}${API_SINGLE_BOARD_URL}?boardId=${boardId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
