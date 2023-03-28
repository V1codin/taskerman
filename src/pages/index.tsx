import BoardsContainer from '@/components/BoardsContainer/BoardsContainer';
import HeaderLayout from '@/layouts/HeaderLayout';
import fetcher from '@/libs/fetcher';

import { API_BOARDS_URL, BASE_URL } from '@/utils/constants';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import { TBoard } from '../../types/db';
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
  console.log('session: ', session);

  if (session) {
    try {
      const boards = await fetcher<{ data: TBoard[] }>(
        `${BASE_URL}${API_BOARDS_URL}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            userId: session.user._id,
            subs: session.user.subs,
          }),
        },
      );

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
