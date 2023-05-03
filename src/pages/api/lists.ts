import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { getUserByRequest } from '@/libs/getUserByRequest';

import { dbConnect } from '@/libs/db/connect';
import { listService } from '@/libs/lists.service';
import { creatingListSchema } from '@/types/db';
import type { TListNS } from '@/types/db';
import type { TListsApiNS, TMethods } from '@/types/api';
import type { NextApiResponse } from 'next';

const listsReducer = async <TMethod extends TMethods>(
  method: TMethod,
  req: TListsApiNS.Request,
  issuerId: string,
): Promise<TListsApiNS.ResponseType<TMethod>> => {
  await dbConnect();

  // ? GET is for getting lists of the queried board
  if (method === 'GET') {
    const boardIdFromQuery = req.query['boardId'];

    try {
      if (!boardIdFromQuery || typeof boardIdFromQuery !== 'string') {
        throw new BadRequestError();
      }

      const lists = await listService.getListsByBoardId(boardIdFromQuery);

      return {
        data: lists,
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

  // ? POST is for creating list
  if (method === 'POST') {
    // TODO check if the person who creates list is allowed to do that

    const parsedBody = creatingListSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new BadRequestError();
    }

    const body = req.body as TListNS.TCreating;

    const createdList = await listService.create(body);

    return {
      data: createdList,
    };
  }

  throw new BadRequestError();
};

export default async function handler(
  req: TListsApiNS.Request,
  res: NextApiResponse<Awaited<ReturnType<typeof listsReducer>> | TError>,
) {
  try {
    if (!req.method) {
      throw new BadRequestError();
    }
    const issuerId = await getUserByRequest(req);
    const { data } = await listsReducer(req.method as TMethods, req, issuerId);

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
