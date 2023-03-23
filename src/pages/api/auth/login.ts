import { setAuthorizationToken } from './../../../utils/setAuthorizationToken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/libs/db/provider';
import { ServerResponseError } from '@/libs/error.service';
import { TUserLogin } from '../../../../types/state';
import { OmitedSafeUser } from '../../../../types/db';

type TError = {
  message: string;
};

export type TResponseLoginData<T extends boolean> = {
  isLoggedIn: T;
  data: T extends true ? OmitedSafeUser : null;
  error: T extends false ? TError : null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponseLoginData<boolean>>,
) {
  try {
    if (!req.body || typeof req.body !== 'object') {
      throw new ServerResponseError({
        message: 'Error: Unauthorized',
        code: 401,
      });
    }
    const body: TUserLogin = req.body;

    const { token, user } = await auth.signInWithPassword(body);
    await setAuthorizationToken(req, res, token);

    const result: TResponseLoginData<true> = {
      isLoggedIn: true,
      data: user,
      error: null,
    };

    res.status(200).json(result);
  } catch (e) {
    const toSend: TResponseLoginData<false> = {
      isLoggedIn: false,
      data: null,
      error: {
        message: e instanceof Error ? e.message : 'Server Error',
      },
    };

    res.status(e instanceof ServerResponseError ? e.code : 500).send(toSend);
  }
}
