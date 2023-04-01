import NextAuth from 'next-auth';

import { SessionUser } from './db';

declare module 'next-auth/jwt' {
  interface JWT {
    user: SessionUser;
  }
}

declare module 'next-auth' {
  interface DefaultUser {}

  type ISODateString = string;

  interface Session {
    user: SessionUser;
    expires: ISODateString;
  }
}
