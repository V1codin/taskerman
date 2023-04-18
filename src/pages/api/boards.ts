import { dbConnect } from '@/libs/db/connect';
import { TGetBoardReturnByMethod, TMethods, BoardsRequest } from '@/types/api';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { TBoardNS, creatingBoardSchema, deletingBoardSchema } from '@/types/db';
import { boardService } from '@/libs/boards.service';
import { getUserByRequest } from '@/libs/getUserByRequest';
import type { NextApiResponse } from 'next';

const boardsReducer = async <TMethod extends TMethods>(
  method: TMethod,
  req: BoardsRequest,
  issuerId: string,
): Promise<TGetBoardReturnByMethod<TMethod>> => {
  await dbConnect();

  // ? POST is for creating board
  if (method === 'POST') {
    const parsedBody = creatingBoardSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new BadRequestError();
    }

    const body = req.body as TBoardNS.TCreatingBoard;
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

    const { boardId } = req.body as TBoardNS.TDeletingBoard;

    try {
      const boardToDelete = await boardService.getBoardById(boardId);

      if (!boardToDelete) {
        throw new ServerResponseError({
          code: 404,
          message: 'Error: Document was not found',
        });
      }

      if (!boardService.isValidIssuer(issuerId, boardToDelete.owner._id)) {
        throw new ServerResponseError({
          code: 403,
          message: 'Error: Only board OWNER can delete the board',
        });
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
  req: BoardsRequest,
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
