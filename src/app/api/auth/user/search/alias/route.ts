import { authService } from '@/libs/auth.service';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const token = authService.getTokenByReaquestHeaders(req.headers);
    await authService.getUserIdByRequest(token);

    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const userAliasFromQuery = queryParams.get('nameAlias');

    if (!userAliasFromQuery) {
      throw new BadRequestError();
    }

    const result = await authService.getUsersByAlias(userAliasFromQuery);

    return NextResponse.json({ data: result }, { status: 200 });
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
