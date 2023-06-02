'use client';

import { SessionProvider as NextAuthProvider } from 'next-auth/react';

import type { PropsWithChildren } from 'react';

type SessionProviderProps = {};

const SessionProvider: React.FC<PropsWithChildren<SessionProviderProps>> = ({
  children,
}) => {
  return <NextAuthProvider>{children}</NextAuthProvider>;
};

export default SessionProvider;
