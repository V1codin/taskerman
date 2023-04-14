import { dbConnect } from '@/libs/db/connect';
import { boardService } from '@/libs/boards.service';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { listService } from '@/libs/lists.service';
import type { TError } from '@/types/state';
import type { NextApiResponse, NextApiRequest } from 'next/types';
import { getUserByRequest } from '@/libs/getUserByRequest';
import { authService } from '@/libs/auth.service';
import { TMethods } from '@/types/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown | TError>,
) {
  try {
    if (!req.method) {
      throw new BadRequestError();
    }

    const method = req.method as TMethods;
    await dbConnect();

    if (method === 'GET') {
      const { boardId } = req.query;

      if (!boardId || typeof boardId !== 'string') {
        throw new BadRequestError();
      }

      try {
        const issuerId = await getUserByRequest(req);

        const isValidUser = await authService.isValidUserForGettingBoard(
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

        const lists = await listService.getListsByBoardId(board._id);

        res.status(200).json({
          data: {
            board: board,
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
