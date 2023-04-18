import { dbConnect } from '@/libs/db/connect';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { TMethods } from '@/types/api';
import { AuthClient } from '@/types/state';
import { validateNewUserBySchema } from '@/utils/helpers';

import type { NextApiRequest, NextApiResponse } from 'next/types';
import { dbAdapter } from './[...nextauth]';

type TCreatedUserResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TCreatedUserResponse | TError>,
) {
  try {
    if (!req.method) {
      throw new BadRequestError();
    }

    const method = req.method as TMethods;

    await dbConnect();

    if (method === 'POST') {
      if (!req.body.authType) {
        throw new BadRequestError();
      }

      const { authType, userData } = req.body;

      const parsedUser = validateNewUserBySchema(authType, userData);

      if (!parsedUser.success) {
        throw new BadRequestError();
      }

      const user = userData as AuthClient.TSignUpBodyReducer<typeof authType>;

      // ? returning error because this catch doesn't work with threw errors from dbAdapter._createUser
      const { error, data } = await dbAdapter._createUser(user);

      if (error) {
        throw error;
      }

      res.status(200).json({
        message: data!,
      });
    }
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
