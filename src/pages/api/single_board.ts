import mongoProvider from '@/libs/db/mongo';

import { authService } from '@/libs/auth.service';
import { boardService } from '@/libs/boards.service';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { listService } from '@/libs/lists.service';
import { checkSessionToken } from '@/libs/sessionTokenChecker';
import type { TError } from '@/types/state';
import type { NextApiResponse, NextApiRequest } from 'next/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown | TError>,
) {
  try {
    if (!req.method) {
      throw new BadRequestError();
    }

    const token = await checkSessionToken(req);
    const issuerId = token.user.id;

    const { method } = req;
    if (method === 'GET') {
      const { boardId } = req.query;

      if (!boardId || typeof boardId !== 'string') {
        throw new BadRequestError();
      }

      try {
        const isValidUser = await mongoProvider.isValidUserForGettingBoardUtils(
          issuerId,
          boardId,
        );

        if (!isValidUser) {
          throw new ServerResponseError({
            code: 403,
            message: 'Error: Unauthorized',
          });
        }

        const board = await boardService.getBoardById(boardId);
        if (!board) {
          throw new ServerResponseError({
            code: 404,
            message: 'Error: Document was not found',
          });
        }

        const result = await authService.getSafeBoardData(board);
        const lists = await listService.getListsByBoardId(board._id);

        res.status(200).json({
          data: {
            board: result,
            lists,
          },
        });
      } catch (e) {
        if (e instanceof ServerResponseError) {
          throw e;
        }

        throw new ServerResponseError({
          code: 500,
          message: 'Error: Server does not response',
        });
      }
    }
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
