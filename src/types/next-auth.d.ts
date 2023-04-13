import NextAuth from 'next-auth';

import { SessionUser } from './db';

declare module 'next-auth/jwt' {
  interface JWT {
    user: SessionUser;
  }
}

declare module 'next-auth' {
  interface AdapterUser extends SessionUser {}

  interface DefaultUser {}

  type ISODateString = string;

  interface Session {
    user: AdapterUser;
    expires: ISODateString;
  }
}
