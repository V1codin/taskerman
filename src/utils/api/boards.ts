import fetcher from '@/libs/fetcher';

import { TBoard, TCreatingBoard } from '@/types/db';
import { API_BOARDS_URL, BASE_URL } from '../constants';

export const getBoards = (username: string, token: string | undefined) => {
  return fetcher<{ data: TBoard[] }>(
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
  return fetcher<{ data: TBoard }>(`${BASE_URL}${API_BOARDS_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(board),
  });
};
