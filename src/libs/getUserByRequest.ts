import { NextApiRequest } from 'next/types';
import { ServerResponseError } from './error.service';
import { dbAdapter } from '@/pages/api/auth/[...nextauth]';

export const getUserByRequest = async (
  req: NextApiRequest,
): Promise<string> | never => {
  const token = req.headers['authorization']?.split(' ').pop();

  if (!token) {
    throw new ServerResponseError({
      code: 403,
      message: 'Error: Unauthorized',
    });
  }

  try {
    const userAndSession = await dbAdapter.getSessionAndUser(token);

    if (!userAndSession?.user.id) {
      throw new Error();
    }

    return userAndSession.user.id;
  } catch (e) {
    throw new ServerResponseError({
      code: 403,
      message: 'Error: Unauthorized',
    });
  }
};
