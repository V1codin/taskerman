import { PrismaClient } from '@prisma/client';
import { ServerResponseError } from '@/libs/error.service';

import type { DataBaseProvider } from '@/types/db';
import type {
  INotification,
  TBoard,
  TBoardMember,
  TEditableUserProps,
} from '../schemas/types';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [process.env.NODE_ENV === 'development' ? 'query' : 'info'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// ? unknown types because prisma handles types itself
interface PrismaDbProvider
  extends DataBaseProvider<
    string, //  ParticularDBType
    unknown, //   TBoardQuery
    unknown, //   TUserByName
    unknown, //   TUserById
    unknown, //   TUserIdByUserName
    unknown, //   TPatchedUser
    unknown, //   TUsersByAlias
    Promise<string | null>, //   TBoardBackgroundById
    Promise<string | null>, //   TBoardTitleById
    unknown, //   TBoardDById
    Promise<TBoardMember[]>, //   TBoardMembers
    unknown, //   TUserBoards
    // ? unknown because Boards.create is overloading function
    // ? and ReturnType is not compatible
    unknown, //   TCreatedBoard
    unknown, //   TDeletedBoard
    Promise<boolean>, //   TUnsubedUserFromBoard
    Promise<boolean>, //   TCreatedNotification
    Promise<INotification[]>, //   TNotificationsByUserId
    Promise<INotification | null>, //   TNotificationById
    Promise<boolean>, //   TDeletedNotification
    Promise<boolean>, //   TDeclinedInvite
    unknown, //   TAddBoardMember
    Promise<boolean> //   TAddBoardInvite
  > {}

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
  confirmBoardInvite(userId: string, boardId: string): unknown {
    throw new Error('Method not implemented.');
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
      console.error('', e);

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

  async createNotification(note: {
    type: 'info' | 'option';
    text: string;
    recipient: string;
    priority: 'conflict' | 'warning' | 'notification';
    action: 'board_invite';
    actionData: { boardId?: string | undefined };
  }) {
    try {
      await prisma.notification.create({
        data: {
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
      console.error('', e);
      return false;
    }
  }

  async getSafeNotificationsByUserId(userId: string): Promise<INotification[]> {
    try {
      return [];
    } catch (e) {
      return [];
    }
  }

  getAllBoardsByUserQueryUtils(userId: string): unknown {
    throw new Error('Method not implemented.');
  }
  getBoardMembers(boardId: string): Promise<TBoardMember[]> {
    throw new Error('Method not implemented.');
  }
  isValidUserForGettingBoardUtils(
    userId: string,
    boardId: string,
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getUserById(userId: string): unknown {
    throw new Error('Method not implemented.');
  }
  getUserIdByUserName(username: string): unknown {
    throw new Error('Method not implemented.');
  }
  patchUser(userId: string, patch: TEditableUserProps): unknown {
    throw new Error('Method not implemented.');
  }

  unsubscribeFromBoard(userId: string, board: TBoard): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  declineBoardInvite(userId: string, boardId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getSafeNotificationById(id: string): Promise<INotification | null> {
    throw new Error('Method not implemented.');
  }
  deleteNotification(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

const postgresProvider = new PostgresSqlDataBaseProvider();

export default postgresProvider;
