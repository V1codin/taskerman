import { authService } from '@/libs/auth.service';
import { boardService } from '@/libs/boards.service';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { notificationService } from '@/libs/notifications.service';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const token = authService.getTokenByReaquestHeaders(req.headers);
    const issuerId = await authService.getUserIdByRequest(token);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '';

    const note = await notificationService.getNotificationById(id);

    if (!note) {
      throw new ServerResponseError({
        code: 404,
        message: 'Error: Document was not found',
      });
    }

    if (!note.recipient?.id || note.recipient.id !== issuerId) {
      throw new ServerResponseError({
        code: 403,
        message: 'Error: Unauthorized',
      });
    }

    const isRemoved = await notificationService.delete(id);

    if (!isRemoved) {
      throw new BadRequestError();
    }

    if (note.action === 'board_invite') {
      await boardService.confirmBoardInvite(
        note.recipient.id,
        note.actionData?.boardId || '',
      );
    }

    return NextResponse.json(
      {
        removedNoteId: id,
      },
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
