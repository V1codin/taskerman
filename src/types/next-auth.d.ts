import NextAuth from 'next-auth';

import { GoogleProfile } from 'next-auth/providers/google';
import { SessionUser } from './db';

declare module 'next-auth/jwt' {
  interface JWT {
    user: SessionUser;
  }
}

declare module 'next-auth' {
  // TODO add another provider profiles
  type TAuthProviderProfiles = GoogleProfile;

  interface AdapterUser extends SessionUser {}

  interface DefaultUser {}

  type ISODateString = string;

  interface Session {
    user: AdapterUser;
    expires: ISODateString;
  }
}
