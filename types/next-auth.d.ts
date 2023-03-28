import NextAuth from 'next-auth';

import { SessionUser } from './db';

declare module 'next-auth/jwt' {
  interface JWT extends SessionUser {}
}

declare module 'next-auth' {
  interface DefaultUser {}

  type ISODateString = string;
  export type User = SessionUser;

  interface Session {
    user: User;
    expires: ISODateString;
  }
}
