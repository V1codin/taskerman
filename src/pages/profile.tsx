import { isAuthenticatedAtom } from '@/context/stateManager';
import { auth } from '@/libs/db/provider';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useAtomValue } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import { useEffect } from 'react';

type Props = {
  isCachedLogin: boolean;
};

export default function Profile({ isCachedLogin }: Props) {
  console.log('isCachedLogin: ', isCachedLogin);
  useHydrateAtoms([[isAuthenticatedAtom, isCachedLogin]]);
  const isLogged = useAtomValue(isAuthenticatedAtom);
  console.log('isLogged: ', isLogged);

  return <p>Logged</p>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = ctx.req.cookies[AUTH_TOKEN_COOKIE_NAME] || '';

  try {
    await auth.validateToken(token);

    return {
      props: {
        isCachedLogin: true,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
}
