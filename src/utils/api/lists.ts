import fetcher from './fetcher';

import { API_LISTS_URL, BASE_URL } from '../constants';
import type { TListNS } from '@/types/db';

export const createList = (board: TListNS.TCreating) => {
  return fetcher<{ data: TListNS.TList }>(`${BASE_URL}${API_LISTS_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(board),
  });
};

export const getListsByBoardId = (
  boardId: string,
  token: string | undefined,
) => {
  return fetcher<{ data: TListNS.TList[] }>(
    `${BASE_URL}${API_LISTS_URL}?boardId=${boardId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
