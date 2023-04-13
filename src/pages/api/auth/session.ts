import { ServerResponseError } from '@/libs/error.service';

import type { TError } from '@/types/state';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import type { SessionUser } from '@/types/db';

import { dbConnect } from '@/libs/db/connect';
import { authService } from '@/libs/auth.service';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { deleteCookie } from 'cookies-next';

export type TAuthenticatedUser = {
  user: SessionUser;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TAuthenticatedUser | TError>,
) {
  try {
    await dbConnect();

    const token = req.cookies[AUTH_TOKEN_COOKIE_NAME];
    const user = await authService.getSessionUser(token);

    if (user) {
      res.status(200).json({
        user,
      });

      return;
    }
    // ? if there is no user we need to clear invalid token
    deleteCookie(AUTH_TOKEN_COOKIE_NAME, {
      req,
      res,
    });

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
