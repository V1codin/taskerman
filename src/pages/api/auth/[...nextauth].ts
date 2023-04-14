import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';

import { clientPromise, dbConnect } from '@/libs/db/connect';
import { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import {
  AUTH_TOKEN_COOKIE_NAME,
  isDev,
  MONGO_DB_NAME,
  SESSION_MAX_AGE_DAYS,
} from '@/utils/constants';
import { getAgeInSec } from '@/utils/helpers';
import { authService } from '@/libs/auth.service';

import { setCookie, getCookie } from 'cookies-next';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { decode, encode } from 'next-auth/jwt';
import { SessionModel } from '@/models/middlewares';
import { Adapter, AdapterSession } from 'next-auth/adapters';
import { IUser } from '@/models/users';
import { SessionUser } from '@/types/db';
import { IBoard } from '@/models/boards';

const generate = {
  uuid() {
    return this.uuidv4();
  },
  uuidv4() {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        // @ts-ignore
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16),
    );
  },
};

const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000);
};

const generateSessionToken = () => {
  return randomUUID?.() ?? generate.uuid();
};

type MyAdapter = Adapter & {
  _getSessionAndUser(
    sessionToken: string,
  ): Promise<{ user: SessionUser; session: AdapterSession } | null>;
};

const mongoAdapter: MyAdapter = {
  ...MongoDBAdapter(clientPromise, {
    databaseName: MONGO_DB_NAME,
    collections: {
      Users: 'users',
      VerificationTokens: 'verification_tokens',
      Sessions: 'sessions',
      Accounts: 'accounts',
    },
  }),
  async _getSessionAndUser(sessionToken: string) {
    await dbConnect();

    const result = await SessionModel.findOne({ sessionToken }).populate({
      path: 'userId',
      populate: {
        path: 'subs',
      },
    });
    if (!result) return null;

    const objectedResult = result.toObject();

    const session: AdapterSession = {
      expires: objectedResult.expires,
      sessionToken: objectedResult.sessionToken,
      userId: objectedResult._id,
    };

    const populatedUser = objectedResult.userId as IUser;

    const user: SessionUser = {
      ...populatedUser,
      subs: populatedUser.subs as IBoard[],
      id: populatedUser._id,
    };

    return {
      user,
      session,
    };
  },
};

export const dbAdapter: MyAdapter = mongoAdapter;

export const getAuthOptions = (
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions => {
  return {
    session: {
      strategy: 'database',
      maxAge: getAgeInSec({ days: SESSION_MAX_AGE_DAYS }),
    },
    jwt: {
      // Customize the JWT encode and decode functions to overwrite the default behaviour of storing the JWT token in the session  cookie when using credentials providers. Instead we will store the session token reference to the session in the database.
      // @ts-ignore
      encode: async function ({ token, secret, maxAge }) {
        if (
          req.query &&
          req.query['nextauth'] &&
          req.query['nextauth'].includes('callback') &&
          req.query['nextauth'].includes('credentials') &&
          req.method === 'POST'
        ) {
          const cookie = getCookie('next-auth.session-token', {
            res,
            req,
          });

          if (cookie) return cookie;
          else return '';
        }
        // Revert to default behaviour when not in the credentials provider callback flow
        return encode({ token, secret, maxAge });
      },
      decode: async ({ token, secret }) => {
        if (
          req.query &&
          req.query['nextauth'] &&
          req.query['nextauth'].includes('callback') &&
          req.query['nextauth'].includes('credentials') &&
          req.method === 'POST'
        ) {
          return null;
        }

        // Revert to default behaviour when not in the credentials provider callback flow
        return decode({ token, secret });
      },
    },
    secret: process.env['NEXTAUTH_SECRET'],
    pages: {
      signIn: '/',
      error: '/error',
      newUser: '/profile',
    },
    callbacks: {
      async signIn({ user }) {
        // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).
        if (
          req.query &&
          req.query['nextauth'] &&
          req.query['nextauth'].includes('callback') &&
          req.query['nextauth'].includes('credentials') &&
          req.method === 'POST'
        ) {
          if (user) {
            const sessionToken = generateSessionToken(); // Implement a function to generate the session token (you can use randomUUID as an example)
            const sessionMaxAge = getAgeInSec({ days: SESSION_MAX_AGE_DAYS });
            const sessionExpiry = fromDate(sessionMaxAge); // Implement a function to calculate the session cookie expiry date

            await mongoAdapter.createSession({
              sessionToken: sessionToken,
              userId: user.id,
              expires: sessionExpiry,
            });

            setCookie(AUTH_TOKEN_COOKIE_NAME, sessionToken, {
              req,
              res,
              expires: sessionExpiry,
            });
          }
        }

        return true;
      },
      async jwt({ token, user }) {
        const castedUser = user as SessionUser;
        if (user) {
          token['id'] = castedUser.id;
          token.name = castedUser.displayName! || '';
          token.picture = castedUser.imageURL || '';
          token.user = castedUser;
        }

        return token;
      },

      async session({ session, token }) {
        if (token) {
          session.user = token.user;
          // @ts-ignore
          session.id = token.id;
        }
        return session;
      },
    },
    useSecureCookies: !isDev(),
    adapter: mongoAdapter,
    providers: [
      GoogleProvider({
        clientSecret: process.env['GOOGLE_CLIENT_S']!,
        clientId: process.env['GOOGLE_CLIENT_ID']!,
      }),
      CredentialsProvider({
        id: 'credentials',
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },

        async authorize(credentials) {
          await dbConnect();
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          try {
            if (
              !credentials ||
              !credentials.username ||
              !credentials.password
            ) {
              return null;
            }

            const user = await authService.authorizeWithCredentials(
              credentials!,
            );

            return user;
          } catch (e) {
            return null;
          }
        },
      }),
    ],
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return await NextAuth(req, res, getAuthOptions(req, res));
}
