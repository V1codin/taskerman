import BoardsContainer from '@/components/BoardsContainer/BoardsContainer';
import HeaderLayout from '@/layouts/HeaderLayout';

import { getBoards } from '@/utils/api/boards';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import { TBoard } from '@/types/db';
import { authOptions } from './api/auth/[...nextauth]';

type Props = {
  boards?: TBoard[];
};

export default function Home({ boards }: Props) {
  const { status } = useSession();
  return (
    <HeaderLayout>
      {status === 'authenticated' && boards && (
        <BoardsContainer boards={boards} />
      )}
    </HeaderLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    const token = context.req.cookies[AUTH_TOKEN_COOKIE_NAME];

    try {
      const boards = await getBoards(session.user.username, token);

      return {
        props: {
          boards: boards.data,
        },
      };
    } catch (e) {
      return {
        props: {},
      };
    }
  }

  return {
    props: {},
  };
}
