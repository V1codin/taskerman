import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { cookies } from 'next/headers';
import { GoogleProfile } from 'next-auth/providers/google';
import { dbConnect } from '@/libs/db/connect';
import { NextAuthOptions } from 'next-auth';
import {
  AUTH_TOKEN_COOKIE_NAME,
  CURRENT_DB,
  isDev,
  SESSION_MAX_AGE_DAYS,
} from '@/utils/constants';
import { mongoAdapter } from './mongo/api/adapter';
import {
  fromDate,
  generateSessionToken,
  getAgeInSec,
  getProfileDataOfAuthProvider,
} from '../server.helpers';
import { authService } from '@/libs/auth.service';
import { decode, encode } from 'next-auth/jwt';
import { ServerResponseError } from '@/libs/error.service';
import { postgresAdapter } from './postgres/api/adapter';

import type { SessionUser } from '@/types/db';
import type { Adapter, AdapterSession } from 'next-auth/adapters';
import type { TMethods } from '@/types/api';
import type { AuthClient } from '@/types/state';

type Session = { user: SessionUser; session: AdapterSession };

export type MyAdapter = Adapter & {
  _getSessionAndUser(sessionToken: string): Promise<Session | null>;
  _createSession(session: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Promise<AdapterSession>;

  _createUser(user: AuthClient.TSignUpBodyReducer<TSignUp>): Promise<{
    error?: ServerResponseError<400 | 403>;
    data: string | null;
  }>;

  _removeExpiredSessionToken(token: string): Promise<boolean>;
};

export const dbAdapter =
  CURRENT_DB !== 'mongo' ? postgresAdapter : mongoAdapter;

export const getAuthOptions = (method?: TMethods | string): NextAuthOptions => {
  return {
    session: {
      maxAge: getAgeInSec({ days: SESSION_MAX_AGE_DAYS }),
    },
    jwt: {
      // Customize the JWT encode and decode functions to overwrite the default behaviour of storing the JWT token in the session  cookie when using credentials providers. Instead we will store the session token reference to the session in the database.
      // @ts-ignore
      encode: async function ({ token, secret, maxAge }) {
        if (method === 'POST') {
          const cookieStore = cookies();
          const cookie = cookieStore.get(AUTH_TOKEN_COOKIE_NAME);

          if (cookie) return cookie;
          else return '';
        }
        // Revert to default behaviour when not in the credentials provider callback flow
        return encode({ token, secret, maxAge });
      },
      decode: async ({ token, secret }) => {
        if (method === 'POST') {
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
    cookies: {
      sessionToken: {
        name: AUTH_TOKEN_COOKIE_NAME,
        options: {
          httpOnly: !isDev(),
          sameSite: 'lax',
          path: '/',
          secure: !isDev(),
        },
      },
    },
    callbacks: {
      async signIn({ user }) {
        // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).
        if (method === 'POST') {
          if (user) {
            const sessionToken = generateSessionToken(); // Implement a function to generate the session token (you can use randomUUID as an example)
            // ? this max age should be the same as expireAfterSeconds in SESSION SCHEMA props
            const sessionMaxAge = getAgeInSec({ days: SESSION_MAX_AGE_DAYS });
            const sessionExpiry = fromDate(sessionMaxAge); // Implement a function to calculate the session cookie expiry date

            try {
              await dbAdapter._createSession({
                sessionToken: sessionToken,
                userId: user.id,
                expires: sessionExpiry,
              });

              const cookieStore = cookies();

              // ? https://github.com/vercel/next.js/issues/49259
              // ? NEXTJS Doc: .set() is only available in a Server Action or Route Handler.
              // ? This is gonna be executed in Route Handler
              // @ts-ignore
              cookieStore.set(AUTH_TOKEN_COOKIE_NAME, sessionToken, {
                expires: sessionExpiry,
                httpOnly: !isDev(),
                sameSite: 'lax',
                path: '/',
                secure: !isDev(),
              });
            } catch (e) {
              console.error('creating session error', e);

              return false;
            }
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
    adapter: dbAdapter,
    providers: [
      GoogleProvider<GoogleProfile>({
        checks: 'pkce',
        clientSecret: process.env['GOOGLE_CLIENT_S']!,
        clientId: process.env['GOOGLE_CLIENT_ID']!,
        allowDangerousEmailAccountLinking: true,
        profile(profile) {
          return getProfileDataOfAuthProvider('google', profile);
        },
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
