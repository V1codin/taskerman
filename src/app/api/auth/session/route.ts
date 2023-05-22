import { dbConnect } from '@/libs/db/connect';
import { authService } from '@/libs/auth.service';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { cookies } from 'next/headers';
import { ServerResponseError } from '@/libs/error.service';

import type { NextApiRequest } from 'next/types';
import type { SessionUser } from '@/types/db';

export type TAuthenticatedUser = {
  user: SessionUser;
};

const handler = async (req: NextApiRequest) => {
  try {
    await dbConnect();

    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_TOKEN_COOKIE_NAME)?.value;
    const user = await authService.getSessionUser(token);

    if (user) {
      return new Response(
        JSON.stringify({
          user,
        }),
        {
          status: 200,
        },
      );
    }

    // ? https://github.com/vercel/next.js/issues/49259
    // @ts-ignore
    cookieStore.delete(AUTH_TOKEN_COOKIE_NAME);

    throw new ServerResponseError({
      code: 403,
      message: 'Error: Unauthorized',
    });
  } catch (e) {
    if (e instanceof ServerResponseError) {
      return new Response(
        JSON.stringify({
          message: e.message,
          code: e.code,
        }),
        {
          status: e.code,
        },
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Error: Server does not response',
        code: 500,
      }),
      {
        status: 500,
      },
    );
  }
};

export { handler as GET, handler as POST };
