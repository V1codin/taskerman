import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]';
import { ServerResponseError } from '@/libs/error.service';
import { boardService } from '@/libs/boards.service';

import type { TError } from '@/types/state';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import type { SessionUser, TBoardNS } from '@/types/db';

import { dbConnect } from '@/libs/db/connect';

export type TAuthenticatedUser = {
  user: SessionUser;
  boards: TBoardNS.TRawUserBoards;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TAuthenticatedUser | TError>,
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      await dbConnect();
      const boards = await boardService.getUserBoards(session.user.id);

      res.status(200).json({
        user: session.user,
        boards,
      });

      return;
    }
    throw new ServerResponseError({
      code: 403,
      message: 'Error: Unauthorized',
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
      code: 500,
      message: 'Error: Server does not response',
    });
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
