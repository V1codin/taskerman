import mongoProvider from '@/libs/db/mongo';

import { dbConnect } from '@/libs/db/connect';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { TBoardNS, creatingBoardSchema, deletingBoardSchema } from '@/types/db';
import { boardService } from '@/libs/boards.service';
import { getUserByRequest } from '@/libs/getUserByRequest';
import { TBoardsApiNS, TMethods } from '@/types/api';
import type { NextApiResponse } from 'next';

const boardsReducer = async <TMethod extends TMethods>(
  method: TMethod,
  req: TBoardsApiNS.Request,
  issuerId: string,
): Promise<TBoardsApiNS.ResponseType<TMethod>> => {
  await dbConnect();

  // ? GET is for getting all boards
  if (method === 'GET') {
    const userIdFromQuery = req.query['userId'];

    try {
      if (!userIdFromQuery || typeof userIdFromQuery !== 'string') {
        throw new BadRequestError();
      }

      const boards = await boardService.getUserBoards(userIdFromQuery);

      if (!boards || !boards.length) {
        throw new ServerResponseError({
          code: 404,
          message: 'Error: Document was not found',
        });
      }

      return {
        data: boards,
      };
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

  // ? POST is for creating board
  if (method === 'POST') {
    const parsedBody = creatingBoardSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new BadRequestError();
    }

    const body = req.body as TBoardNS.TCreating;
    const createdBoard = await boardService.create(body);

    return {
      data: createdBoard,
    };
  }

  if (method === 'DELETE') {
    const parsedBody = deletingBoardSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new BadRequestError();
    }

    const { boardId } = req.body as TBoardNS.TDeleting;

    try {
      const boardToDelete = await boardService.getBoardById(boardId);

      if (!boardToDelete) {
        throw new ServerResponseError({
          code: 404,
          message: 'Error: Document was not found',
        });
      }

      if (!boardService.isValidIssuer(issuerId, boardToDelete)) {
        throw new ServerResponseError({
          code: 403,
          message:
            'Error: Only board OWNER can delete the board. Or only SUBSCRIBER can unsubscribe from the board',
        });
      }

      // TODO check issiuer's role -> if 'owner' -> boardService.delete
      // TODO if guest,admin etc -> boardService.unsubscribe
      if (!mongoProvider.isEqualUtils(issuerId, boardToDelete.owner._id)) {
        const deleted = await boardService.unsubscribe(issuerId, boardToDelete);

        if (!deleted.acknowledged) {
          throw new BadRequestError();
        }

        return {
          data: {
            boardId,
          },
        };
      }

      const deleted = await boardService.delete(boardId);

      if (!deleted.acknowledged) {
        throw new BadRequestError();
      }

      return {
        data: {
          boardId,
        },
      };
    } catch (e) {
      if (e instanceof ServerResponseError) {
        throw e;
      }

      throw new BadRequestError();
    }
  }

  throw new BadRequestError();
};

export default async function handler(
  req: TBoardsApiNS.Request,
  res: NextApiResponse<Awaited<ReturnType<typeof boardsReducer>> | TError>,
) {
  try {
    if (!req.method) {
      throw new BadRequestError();
    }
    const issuerId = await getUserByRequest(req);
    const { data } = await boardsReducer(req.method as TMethods, req, issuerId);

    res.status(200).json({
      data,
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
