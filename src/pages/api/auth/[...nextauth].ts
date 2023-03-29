import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import mongoProvider from '@/libs/db/mongo';
import encrypt from '@/libs/encrypt.service';

import { dbConnect, clientPromise } from '@/libs/db/connect';
import { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import {
  isDev,
  JWT_MAX_AGE_DAYS,
  MONGO_DB_NAME,
  SESSION_MAX_AGE_DAYS,
} from '@/utils/constants';
import { SessionUser } from '../../../../types/db';
import { getAgeInSec } from '@/utils/helpers';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: getAgeInSec({ days: SESSION_MAX_AGE_DAYS }),
  },
  jwt: {
    maxAge: getAgeInSec({ days: JWT_MAX_AGE_DAYS }),
    secret: process.env['NEXTAUTH_JWT_SECRET'],
  },

  secret: process.env['NEXTAUTH_SECRET'],
  pages: {
    signIn: '/',
    error: '/error',
    newUser: '/profile',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token['user'] = user as SessionUser;
      }
      return token;
    },

    async session({ session, token }) {
      if (token['user']) {
        session.user = token.user;
      }

      return session;
    },
  },
  useSecureCookies: !isDev(),
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: MONGO_DB_NAME,
    collections: {
      Users: 'users',
      VerificationTokens: 'verification_tokens',
      Sessions: 'sessions',
      Accounts: 'accounts',
    },
  }),
  providers: [
    GoogleProvider({
      clientSecret: process.env['GOOGLE_CLIENT_S']!,
      clientId: process.env['GOOGLE_CLIENT_ID']!,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Username and password',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        try {
          await dbConnect();

          const userFromBD = await mongoProvider.getUserByUserName(
            credentials?.username!,
          );

          if (!userFromBD) {
            throw new Error('Wrong username or password');
          }

          const pw = userFromBD.password;
          const isValidPw = await encrypt.compare(credentials?.password!, pw);

          if (!isValidPw) {
            throw new Error('Wrong password');
          }
          const user = await mongoProvider.getSafeUser(userFromBD);

          return {
            id: user.id,
            subs: user.subs,
            displayName: user.displayName,
            imageURL: user.imageURL,
            email: user.email,
            username: user.username,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
