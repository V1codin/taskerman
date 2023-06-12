import { NextResponse } from 'next/server';
import { authService } from '@/libs/auth.service';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { updateUserSchema } from '@/types/db';

export async function PATCH(req: Request) {
  try {
    const rawToken = req.headers.get('authorization')?.split(' ').pop();
    const token = rawToken === 'Bearer' ? '' : rawToken;
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
