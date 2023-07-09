import encrypt from '@/libs/encrypt.service';

import { prisma } from './prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { ServerResponseError } from '@/libs/error.service';

import type { AdapterSession } from 'next-auth/adapters';
import type { SessionUser } from '@/types/db';
import type { MyAdapter } from '../../adapter';
import type { AuthClient } from '@/types/state';

export const postgresAdapter = {
  ...PrismaAdapter(prisma),
  async _getSessionAndUser(sessionToken: string) {
    try {
      const result = await prisma.session.findUnique({
        where: {
          id: sessionToken,
        },
        include: {
          userId: true,
        },
      });

      if (!result) {
        return null;
      }

      const session: AdapterSession = {
        expires: result.expires,
        sessionToken: result.id,
        userId: result.userId.id,
      };

      const user: SessionUser = {
        email: result.userId.email,
        id: result.userId.id,
        username: result.userId.username,
        displayName: result.userId.displayName ?? '',
        imageURL: result.userId.imageURL ?? '',
      };

      return {
        user,
        session,
      };
    } catch (e) {
      return null;
    }
  },
  async _createSession(session: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Promise<AdapterSession> {
    await prisma.session.create({
      data: {
        userId: {
          connect: {
            id: session.userId,
          },
        },
        id: session.sessionToken,
        expires: session.expires,
      },
    });

    return session;
  },
  async deleteSession(sessionToken) {
    try {
      await prisma.session.delete({ where: { id: sessionToken } });

      return null;
    } catch (e) {
      throw new Error('Deleting session was unsuccessful');
    }
  },
  async _removeExpiredSessionToken(token) {
    try {
      await prisma.session.delete({
        where: {
          id: token,
        },
      });

      return true;
    } catch (e) {
      return false;
    }
  },
  async _createUser(user: AuthClient.TSignUpBodyReducer<TSignUp>) {
    try {
      const isUserExist = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username: user.username,
            },
            {
              email: user.email,
            },
          ],
        },
      });

      if (isUserExist) {
        throw new ServerResponseError({
          code: 403,
          message: 'Error: User with the username already exists',
        });
      }

      const createdUser = await prisma.user.create({
        data: {
          username: user.username,
          displayName: user.displayName,
          email: user.email,
          nameAlias: `${user.displayName} ${user.email}`,
        },
      });

      const safePW = await encrypt.hash(user.password);
      await prisma.password.create({
        data: {
          pw: safePW,
          user: {
            connect: {
              id: createdUser.id,
            },
          },
        },
      });

      return {
        data: 'User was successfully created',
      };
    } catch (e) {
      if (e instanceof ServerResponseError) {
        return {
          data: null,
          error: e,
        };
      }

      return {
        data: null,
        error: new ServerResponseError({
          code: 400,
          message: 'Error: Bad request',
        }),
      };
    }
  },
} as MyAdapter;
