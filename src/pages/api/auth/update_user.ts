import { authService } from '@/libs/auth.service';
import { dbConnect } from '@/libs/db/connect';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { getUserByRequest } from '@/libs/getUserByRequest';
import { TEditableUserProps } from '@/models/users';
import { TMethods } from '@/types/api';
import type { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown | TError>,
) {
  try {
    if (!req.method) {
      throw new BadRequestError();
    }

    const method = req.method as TMethods;

    await dbConnect();

    const issuerId = await getUserByRequest(req);

    if (method === 'PATCH') {
      const body = req.body as TEditableUserProps;

      const updated = await authService.patchUser(issuerId, body);

      if (updated) {
        const updatedUser = {
          ...updated.toObject(),
          id: updated._id,
        };

        res.status(200).json({
          updatedUser,
        });

        return;
      }

      throw new ServerResponseError({
        code: 404,
        message: 'Error: Document was not found',
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
