import mongoProvider from '@/libs/db/mongo';

import { getToken } from 'next-auth/jwt';
import { dbConnect } from '@/libs/db/connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TError } from '../../../types/state';
import { TBoardReturn, TMetods } from '../../../types/api';
import { ServerResponseError } from '@/libs/error.service';

const boardsReducer = async <T extends unknown>(
  method: TMetods,
  body: T,
  req: NextApiRequest,
): Promise<TBoardReturn<TMetods, T>> => {
  if (!method) {
    return {
      status: 500,
      data: null,
    };
  }

  const token = await getToken({
    req,
  });

  if (!token) {
    throw new ServerResponseError({
      code: 403,
    });
  }

  if (method === 'GET') {
    const { username } = req.query;

    try {
      if (!username || typeof username !== 'string') {
        throw new ServerResponseError({
          code: 400,
        });
      }

      await dbConnect();
      const userId = await mongoProvider.getUserIdByUserName(username);
      if (!userId) {
        throw new ServerResponseError({
          code: 404,
        });
      }

      const boards = await mongoProvider.getUserBoards(userId._id);

      return {
        status: 200,
        data: boards,
      };
    } catch (e) {
      if (e instanceof ServerResponseError) {
        throw e;
      }

      throw new ServerResponseError({
        code: 500,
      });
    }
  }

  return {
    status: 500,
    data: null,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | {
        data: Awaited<ReturnType<typeof boardsReducer>>;
      }
    | TError
  >,
) {
  try {
    const { status, data } = await boardsReducer(
      req?.method as TMetods,
      req.body,
      req,
    );

    res.status(status).json({
      data: data,
    });
  } catch (e) {
    if (e instanceof ServerResponseError) {
      res.status(e.code).json({
        message: e.message,
        code: e.code,
      });

      return;
    }

    res.status(500).json({
      message: 'Server does not response',
      code: 500,
    });
  }
}
