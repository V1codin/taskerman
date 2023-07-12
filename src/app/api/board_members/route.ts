import { NextResponse } from 'next/server';
import { authService } from '@/libs/auth.service';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { updatingBoardMembersSchema } from '@/types/db';
import { boardService } from '@/libs/boards.service';
import { notificationService } from '@/libs/notifications.service';
import {
  BOARD_MEMBER_ROLES_PERMISSIONS,
  DEFAULT_INVITED_MEMBER_ROLE,
} from '@/utils/constants';

import type { TNotificationNS } from '@/types/db';
import type { TBoardMembersNS } from '@/types/api';
import type { TBoardMember } from '@/libs/db/postgres/schemas/types';

export async function POST(req: Request) {
  try {
    const token = authService.getTokenByReaquestHeaders(req.headers);
    const issuerId = await authService.getUserIdByRequest(token);

    const rawBody = await req.json();

    const parsedBody = updatingBoardMembersSchema.safeParse(rawBody);
    if (!parsedBody.success) {
      throw new BadRequestError();
    }

    const { boardId, members, type, role, invitationText } =
      rawBody as TBoardMembersNS.TCreating;
    const userRole = await boardService.getUserRole(boardId, issuerId);

    if (!userRole) {
      throw new ServerResponseError({
        code: 403,
        message: 'Error: Unauthorized',
      });
    }

    const isValidUserRole = BOARD_MEMBER_ROLES_PERMISSIONS[userRole][type];

    if (!isValidUserRole) {
      throw new ServerResponseError({
        code: 403,
        message: 'Error: You have no permission to perform this action',
      });
    }

    const board = await boardService.getSafeBoardById(boardId);

    if (!board) {
      throw new ServerResponseError({
        code: 404,
        message: 'Error: The requested board was not found',
      });
    }

    const currentMembers = board.members.reduce<Record<string, boolean>>(
      (acc, item) => {
        if (item && item.user) {
          acc[item.user.id!] = true;
        }

        return acc;
      },
      {},
    );

    const addedMembersIds: string[] = [];
    const newMembers = members.reduce<
      Record<keyof Pick<TBoardMember, 'role' | 'user'>, string>[]
    >((acc, item) => {
      if (currentMembers[item]) {
        return acc;
      }

      const newMember = {
        role: role || DEFAULT_INVITED_MEMBER_ROLE,
        user: item,
      };

      addedMembersIds.push(item);

      acc.push(newMember);

      return acc;
    }, []);

    await boardService.addBoardMember(boardId, newMembers);

    await boardService.addBoardInviteToUser(boardId, newMembers);

    // ? newMembers is already uniq so there is no doubled notification
    newMembers.forEach((member) => {
      const note: TNotificationNS.TCreating<'board_invite'> = {
        type: 'option',
        action: 'board_invite',
        actionData: {
          boardId,
        },
        priority: 'notification',
        recipient: member.user,
        text:
          invitationText ||
          `You've been invited to board.<br> Name: <important>${board.title}</important><br> Owner: <important>${board.owner.displayName}</important>`,
      };

      notificationService.create(note);
    });

    return NextResponse.json(
      {
        message: 'Invites were sent to users',
        addedMembersIds,
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
