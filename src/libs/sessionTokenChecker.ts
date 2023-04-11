import { ServerResponseError } from './error.service';
import { getToken } from 'next-auth/jwt';

import type { NextApiRequest } from 'next/types';

export const checkSessionToken = async (req: NextApiRequest) => {
  try {
    const token = await getToken({
      req,
    });

    if (!token) {
      throw new Error();
    }

    return token;
  } catch (e) {
    throw new ServerResponseError({
      code: 403,
      message: 'Error: Unauthorized',
    });
  }
};
