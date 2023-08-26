import { PrismaClient } from '@prisma/client';
import { DataBaseError, ServerResponseError } from '@/libs/error.service';

import type { Notification } from 'prisma/prisma-client';
import type { DataBaseProvider, TNotificationNS, TRecordNS } from '@/types/db';
import type { TBoard, TEditableUserProps } from '../schemas/types';

const extendedPrismaClient = () => {
  /*
  const prisma = new PrismaClient({
    log: [process.env.NODE_ENV === 'development' ? 'query' : 'info'],
  });*/
  const prisma = new PrismaClient();

  const extendedPrisma = prisma.$extends({});

  return extendedPrisma;
};
export type ExtendedPrismaClient = ReturnType<typeof extendedPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: ExtendedPrismaClient | undefined;
};
export const prisma = globalForPrisma.prisma ?? extendedPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// ? unknown types because prisma handles types itself
interface PrismaDbProvider extends DataBaseProvider {}

export class PostgresSqlDataBaseProvider implements PrismaDbProvider {
  constructor() {}
  // TODO add to DataBaseProvider
  isUserBoardSubscriberUtils(userId: string, board: TBoard) {
    return (
      board.members.findIndex(({ user }) =>
        this.isEqualUtils(userId, user!.id!),
      ) > -1
    );
  }
  // TODO add to DataBaseProvider
  async getUserRole(boardId: string, userId: string) {
    try {
      const member = await prisma.boardMember.findFirst({
        where: {
          AND: [
            {
              board: {
                id: boardId,
              },
            },
            {
              user: {
                id: userId,
              },
            },
          ],
        },
      });

      if (!member) {
        throw new ServerResponseError({
          code: 404,
          message: 'Error: Document was not found',
        });
      }

      return member.role;
    } catch (e) {
      return '';
    }
  }
  // TODO add to DataBaseProvider
  isEqualUtils(str1: string, str2: string): boolean {
    return str1 === str2;
  }
  // TODO add to DataBaseProvider
  getUserAliasRegexQueryUtils(alias: string) {
    return {
      nameAlias: { contains: alias },
    };
  }
  async addBoardMember(
    boardId: string,
    members: Record<'user' | 'role', string>[],
  ) {
    try {
      const result = await prisma.boardMember.createMany({
        data: members.map((item) => {
          return {
            role: 'member',
            isPending: true,
            boardId,
            userId: item.user,
          };
        }),
        skipDuplicates: true,
      });
      if (result.count === 0) {
        throw new Error('Something went wrong');
      }

      return true;
    } catch (e) {
      return false;
    }
  }
  async getUserHashedPassword(username: string): Promise<string> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
        include: {
          password: true,
        },
      });

      return user?.password?.pw || '';
    } catch (e) {
      return '';
    }
  }
  async getUserByUserName(username: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
        include: {
          subs: true,
        },
      });

      return user;
    } catch (e) {
      return null;
    }
  }
  async getUserBoards(userId: string) {
    try {
      const boards = await prisma.board.findMany({
        where: {
          OR: [
            {
              owner: {
                id: userId,
              },
            },
            {
              members: {
                some: {
                  user: {
                    id: userId,
                  },
                  isPending: false,
                },
              },
            },
          ],
        },
        include: {
          owner: true,
          members: {
            include: {
              user: {
                include: {
                  subs: true,
                },
              },
            },
          },
        },
      });

      return boards;
    } catch (e) {
      return [];
    }
  }
  async getUsersByAlias(alias: string) {
    try {
      const query = this.getUserAliasRegexQueryUtils(alias);

      const result = await prisma.user.findMany({
        where: query,
        include: {
          subs: true,
        },
      });

      return result;
    } catch (e) {
      return [];
    }
  }
  async getBoardBackgroundById(boardId: string): Promise<string | null> {
    try {
      const board = await prisma.board.findUnique({
        where: {
          id: boardId,
        },
        select: {
          bg: true,
        },
      });

      if (!board) {
        throw new ServerResponseError({
          code: 404,
          message: 'Error: Document was not found',
        });
      }

      return board.bg;
    } catch (e) {
      return null;
    }
  }
  async getBoardTitleById(boardId: string): Promise<string | null> {
    try {
      const board = await prisma.board.findUnique({
        where: {
          id: boardId,
        },
        select: {
          title: true,
        },
      });

      if (!board) {
        throw new ServerResponseError({
          code: 404,
          message: 'Error: Document was not found',
        });
      }

      return board.title;
    } catch (e) {
      return null;
    }
  }
  async getBoardById(boardId: string) {
    try {
      const board = await prisma.board.findUnique({
        where: {
          id: boardId,
        },
        include: {
          members: {
            include: {
              user: true,
            },
          },
          owner: true,
        },
      });

      if (!board) {
        throw new DataBaseError({
          message: 'Error: Document was not found',
        });
      }

      return board as TBoard<{
        include: {
          members: {
            include: {
              user: true;
            };
          };
          owner: true;
        };
      }>;
    } catch (e) {
      return null;
    }
  }
  async createBoard(board: { title: string; bg: string; owner: string }) {
    const { owner, ...res } = board;
    try {
      const created = await prisma.board.create({
        data: {
          ...res,
          owner: {
            connect: {
              id: owner,
            },
          },
          members: {
            create: {
              isPending: false,
              role: 'owner',
              user: {
                connect: {
                  id: owner,
                },
              },
            },
          },
        },
        include: {
          members: {
            include: {
              user: true,
            },
          },
          owner: true,
        },
      });

      return created;
    } catch (e) {
      return null;
    }
  }
  async deleteBoard(boardId: string): Promise<{
    acknowledged: boolean;
    deletedCount: number;
  }> {
    try {
      await prisma.board.delete({
        where: {
          id: boardId,
        },
      });

      return {
        acknowledged: true,
        deletedCount: 1,
      };
    } catch (e) {
      return {
        acknowledged: false,
        deletedCount: 0,
      };
    }
  }

  async addBoardInviteToUser(
    boardId: string,
    members: Record<'user' | 'role', string>[],
  ) {
    try {
      for (const member of members) {
        await prisma.user.update({
          data: {
            pendingInvites: {
              push: boardId,
            },
          },
          where: {
            id: member.user,
          },
        });
      }

      return true;
    } catch (e) {
      throw new ServerResponseError({
        code: 500,
        message: 'Error: Server does not response',
      });
    }
  }

  async createNotification<
    TAction extends Notification['action'] = 'board_invite',
  >(note: TNotificationNS.TCreating<TAction>) {
    try {
      await prisma.notification.create({
        data: {
          type: note.type,
          text: note.text,
          priority: note.priority,
          action: note.action,
          actionData: {
            create: {
              ...note.actionData,
            },
          },
          recipient: {
            connect: {
              id: note.recipient,
            },
          },
        },
      });

      return true;
    } catch (e) {
      return false;
    }
  }

  async getSafeNotificationsByUserId(userId: string) {
    try {
      if (!userId) {
        return [];
      }

      const notes = await prisma.notification.findMany({
        where: {
          recipient: {
            id: userId,
          },
        },
        include: {
          recipient: true,
          actionData: true,
        },
      });

      if (!notes || !notes.length) {
        throw new Error('Document was not found');
      }

      return notes;
    } catch (e) {
      return [];
    }
  }

  async getSafeNotificationById(id: string) {
    try {
      const note = await prisma.notification.findUnique({
        where: {
          id,
        },
        include: {
          recipient: true,
          actionData: true,
        },
      });

      return note;
    } catch (e) {
      return null;
    }
  }
  async deleteNotification(id: string) {
    try {
      await prisma.$transaction(async (tx) => {
        const deletedNote = await tx.notification.delete({
          where: {
            id,
          },
        });

        await tx.notificationActionData.delete({
          where: {
            id: deletedNote.notificationActionDataId || '',
          },
        });
      });

      return true;
    } catch (e) {
      return false;
    }
  }

  async declineBoardInvite(userId: string, boardId: string) {
    if (!boardId) {
      return false;
    }
    try {
      await prisma.$transaction(async (tx) => {
        const boardMember = await tx.boardMember.findFirst({
          where: {
            AND: [
              {
                boardId,
              },
              {
                user: {
                  id: userId,
                },
              },
            ],
          },
        });

        await tx.boardMember.delete({
          where: {
            id: boardMember?.id,
          },
        });

        const pendingInvitesResult = await tx.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            pendingInvites: true,
          },
        });

        await tx.user.update({
          where: {
            id: userId,
          },
          data: {
            pendingInvites: pendingInvitesResult?.pendingInvites.filter(
              (item) => item !== boardId,
            ),
          },
        });
      });

      return true;
    } catch (e) {
      throw e;
    }
  }
  async confirmBoardInvite(userId: string, boardId: string | null) {
    try {
      await prisma.$transaction(async (tx) => {
        const boardMember = await tx.boardMember.findFirst({
          where: {
            AND: [
              {
                boardId,
              },
              {
                user: {
                  id: userId,
                },
              },
            ],
          },
        });

        await tx.boardMember.update({
          where: {
            id: boardMember?.id,
          },
          data: {
            isPending: false,
          },
        });

        const pendingInvitesResult = await tx.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            pendingInvites: true,
          },
        });

        await tx.user.update({
          where: {
            id: userId,
          },
          data: {
            pendingInvites: pendingInvitesResult?.pendingInvites.filter(
              (item) => item !== boardId,
            ),
          },
        });
      });

      return true;
    } catch (e) {
      throw e;
    }
  }
  async getBoardMembers(boardId: string) {
    try {
      const members = await prisma.boardMember.findMany({
        where: {
          boardId,
        },
      });
      return members;
    } catch (e) {
      return [];
    }
  }
  async getUserById(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      return user;
    } catch (e) {
      return null;
    }
  }
  async getUserIdByUserName(username: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });

      return user?.id || null;
    } catch (e) {
      return null;
    }
  }

  async patchUser(userId: string, patch: TEditableUserProps) {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: patch,
      });

      return updatedUser;
    } catch (e) {
      return null;
    }
  }

  async unsubscribeFromBoard(userId: string, board: TBoard) {
    try {
      const boardMemberId = await prisma.boardMember.findFirst({
        where: {
          AND: [
            {
              userId,
            },
            {
              boardId: board.id,
            },
          ],
        },
      });

      await prisma.boardMember.delete({
        where: {
          id: boardMemberId?.id,
        },
      });

      return true;
    } catch (e) {
      return false;
    }
  }

  async patchBoardBackground(boardId: string, bg: string) {
    try {
      const updated = await prisma.board.update({
        where: {
          id: boardId,
        },
        data: {
          bg,
        },
      });

      return updated;
    } catch (e) {
      return false;
    }
  }

  async patchBoardTitle(boardId: string, title: string) {
    try {
      const updated = await prisma.board.update({
        where: {
          id: boardId,
        },
        data: {
          title,
        },
      });

      return updated;
    } catch (e) {
      return false;
    }
  }

  async getRecordsOfBoard(boardId: string) {
    try {
      const records = await prisma.record.findMany({
        where: {
          boardId: boardId,
        },
      });

      return records;
    } catch (e) {
      return [];
    }
  }

  async createRecord({ heading, userId, boardId }: TRecordNS.TCreating) {
    try {
      const result = await prisma.record.create({
        data: {
          heading,
          user: {
            connect: {
              id: userId,
            },
          },
          board: {
            connect: {
              id: boardId,
            },
          },
        },
      });

      return result;
    } catch (e) {
      console.error('', e);
      return null;
    }
  }
}

const postgresProvider = new PostgresSqlDataBaseProvider();

export default postgresProvider;

export { Notification as TNotification };
