import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import mongoProvider from '@/libs/db/mongo';
import encrypt from '@/libs/encrypt.service';

import { dbConnect, clientPromise } from '@/libs/db/connect';
import { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { isDev, MONGO_DB_NAME } from '@/utils/constants';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env['JWT_OPT_EXPIRE_SECONDS']),
  },
  jwt: {
    maxAge: Number(process.env['JWT_OPT_EXPIRE_SECONDS']),
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
        for (const item in user) {
          token[item] = user[item as keyof typeof user];
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        // ? line 108. email is required in db Schema
        session.user['email'] = token['email']!;
        session.user['_id'] = token['_id'];
        session.user['subs'] = token['subs'];
        session.user['username'] = token['username'];
        session.user['displayName'] = token['displayName'] || '';
        session.user['imageURL'] = token['imageURL'] || '';
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
            _id: user._id,
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
