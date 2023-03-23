import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { AUTH_TOKEN_COOKIE_NAME } from './constants';

export const setAuthorizationToken = (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string,
): Promise<void> => {
  return new Promise((resolve) => {
    const maxAge = Number(process.env['JWT_OPT_EXPIRE_SECONDS']!) * 1000;
    const expires = new Date(Date.now() + maxAge);

    setCookie(AUTH_TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      req,
      res,
      expires,
    });
    resolve();
  });
};
