import { NextResponse } from 'next/server';
import { authService } from '@/libs/auth.service';
import { BadRequestError, ServerResponseError } from '@/libs/error.service';
import { updatingBoardMembersSchema } from '@/types/db';
import { BOARD_MEMBER_ROLES_PERMISSIONS, IBoardMember } from '@/models/boards';
import { boardService } from '@/libs/boards.service';

import type { TBoardMembersNS } from '@/types/api';
import { DEFAULT_INVITED_MEMBER_ROLE } from '@/utils/constants';

export async function POST(req: Request) {
  try {
    const token = authService.getTokenByReaquestHeaders(req.headers);
    const issuerId = await authService.getUserIdByRequest(token);

    const rawBody = await req.json();

    const parsedBody = updatingBoardMembersSchema.safeParse(rawBody);
    if (!parsedBody.success) {
      throw new BadRequestError();
    }

    const { boardId, members, type, role } =
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

    const currentMembers = (await boardService.getBoardMembers(boardId)).reduce<
      Record<string, boolean>
    >((acc, item) => {
      acc[item.user._id] = true;

      return acc;
    }, {});

    const addedMembers: string[] = [];
    const newMembers = members.reduce<
      Record<keyof Pick<IBoardMember, 'role' | 'user'>, string>[]
    >((acc, item) => {
      if (currentMembers[item]) {
        return acc;
      }

      const newMember = {
        role: role || DEFAULT_INVITED_MEMBER_ROLE,
        user: item,
      };

      addedMembers.push(item);

      acc.push(newMember);

      return acc;
    }, []);

    await boardService.addBoardMember(boardId, newMembers);

    return NextResponse.json(
      {
        message: 'Invites were sent to users',
        addedMembersIds: addedMembers,
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    console.log('e: ', e);
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
