import mongoProvider from '@/libs/db/mongo';

import { authService } from '@/libs/auth.service';
import { NextResponse } from 'next/server';
import { boardService } from '@/libs/boards.service';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { creatingBoardSchema } from '@/types/db';

import type { TBoardNS } from '@/types/db';

export async function GET(req: Request) {
  try {
    const token = authService.getTokenByReaquestHeaders(req.headers);
    await authService.getUserIdByRequest(token);

    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const userIdFromQuery = queryParams.get('userId');

    if (!userIdFromQuery) {
      throw new BadRequestError();
    }

    const boards = await boardService.getSafeUserBoards(userIdFromQuery);

    if (!boards || !boards.length) {
      throw new ServerResponseError({
        code: 404,
        message: 'Error: Document was not found',
      });
    }

    return NextResponse.json(
      { data: boards },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      },
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

export async function POST(req: Request) {
  try {
    const token = authService.getTokenByReaquestHeaders(req.headers);
    await authService.getUserIdByRequest(token);

    const rawBody = await req.json();

    const parsedBody = creatingBoardSchema.safeParse(rawBody);
    if (!parsedBody.success) {
      throw new BadRequestError();
    }

    const body = parsedBody.data as TBoardNS.TCreating;
    const createdBoard = await boardService.create(body);

    return NextResponse.json(
      { data: createdBoard },
      {
        status: 200,
      },
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

export async function DELETE(req: Request) {
  try {
    const token = authService.getTokenByReaquestHeaders(req.headers);
    const issuerId = await authService.getUserIdByRequest(token);

    const { searchParams } = new URL(req.url);
    const boardId = searchParams.get('boardId') || '';

    const boardToDelete = await boardService.getSafeBoardById(boardId);

    if (!boardToDelete) {
      throw new ServerResponseError({
        code: 404,
        message: 'Error: Document was not found',
      });
    }

    if (!boardService.isValidIssuer(issuerId, boardToDelete)) {
      throw new ServerResponseError({
        code: 403,
        message:
          'Error: Only board OWNER can delete the board. Or only SUBSCRIBER can unsubscribe from the board',
      });
    }

    // TODO check issiuer's role -> if 'owner' -> boardService.delete
    // TODO if guest,admin etc -> boardService.unsubscribe
    if (!mongoProvider.isEqualUtils(issuerId, boardToDelete.owner._id)) {
      const deleted = await boardService.unsubscribe(issuerId, boardToDelete);

      if (!deleted.acknowledged) {
        throw new BadRequestError();
      }

      return NextResponse.json(
        { data: boardId },
        {
          status: 200,
        },
      );
    }
    const deleted = await boardService.delete(boardId);

    if (!deleted.acknowledged) {
      throw new BadRequestError();
    }

    if (deleted.deletedCount === 0) {
      throw new ServerResponseError({
        code: 500,
        message: 'Error: Server does not response',
      });
    }

    return NextResponse.json(
      { data: boardId },
      {
        status: 200,
      },
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
