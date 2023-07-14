import { NextResponse } from 'next/server';
import { authService } from '@/libs/auth.service';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { updateUserSchema } from '@/types/db';
import { validateNewUserBySchema } from '@/libs/server.helpers';
import { dbAdapter } from '@/libs/db/adapter';

import type { AuthClient } from '@/types/state';

export async function PATCH(req: Request) {
  try {
    const token = authService.getTokenByReaquestHeaders(req.headers);
    const issuerId = await authService.getUserIdByRequest(token);

    const rawBody = await req.json();

    const parsedBody = updateUserSchema.safeParse(rawBody);
    if (!parsedBody.success) {
      throw new BadRequestError();
    }

    const updated = await authService.patchUser(issuerId, rawBody);

    return NextResponse.json({ updatedUser: updated }, { status: 200 });
  } catch (e) {
    if (e instanceof ServerResponseError) {
      return NextResponse.json(
        {
          message: e.message,
          code: e.code,
        },
        {
          status: e.code,
        },
      );
    }

    return NextResponse.json(
      {
        message: 'Error: Server does not response',
        code: 500,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { authType, userData } = await req.json();

    const parsedUser = validateNewUserBySchema(authType, userData);

    if (!parsedUser.success) {
      throw new BadRequestError();
    }

    const user = userData as AuthClient.TSignUpBodyReducer<typeof authType>;
    await dbAdapter._createUser(user);

    return NextResponse.json(
      { message: 'Your account was successfully created' },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof ServerResponseError) {
      return NextResponse.json(
        {
          message: e.message,
          code: e.code,
        },
        {
          status: e.code,
        },
      );
    }

    return NextResponse.json(
      {
        message: 'Error: Server does not response',
        code: 500,
      },
      {
        status: 500,
      },
    );
  }
}
