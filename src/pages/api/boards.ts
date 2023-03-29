import mongoProvider from '@/libs/db/mongo';

import { dbConnect } from '@/libs/db/connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TError } from '../../../types/state';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | {
        data: Awaited<ReturnType<typeof mongoProvider.getUserBoards>>;
      }
    | TError
  >,
) {
  const body = req.body as {
    userId: string;
    subs: string[];
  };

  try {
    await dbConnect();
    const boards = await mongoProvider.getUserBoards(body.userId);

    res.status(200).json({
      data: boards,
    });
  } catch (e) {
    res.status(404).json({
      message: 'Document was not found',
      code: 404,
    });
  }
}
