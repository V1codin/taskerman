import ProfileForm from '@/components/ProfileForm/ProfileForm';

import { useSession } from 'next-auth/react';
import { dbAdapter } from './api/auth/[...nextauth]';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { GetServerSidePropsContext } from 'next/types';
import { IBoard } from '@/models/boards';
import { getSetBoardsState } from '@/context/stateManager';
import { useHydrateAtoms } from 'jotai/utils';
import { api } from '@/utils/api/api';

type ProfileProps = {
  boards: IBoard[];
};

export default function Profile({ boards }: ProfileProps) {
  useHydrateAtoms([[getSetBoardsState, boards]]);
  const { status } = useSession();

  if (status !== 'authenticated') {
    return (
      <h1 style={{ textAlign: 'center' }}>Please log in for profile page</h1>
    );
  }

  return <ProfileForm />;
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const token = req.cookies[AUTH_TOKEN_COOKIE_NAME];

  const sessionAndUser = await dbAdapter.getSessionAndUser(token || '');

  if (sessionAndUser) {
    try {
      const response = await api.read(
        'board',
        {
          userId: sessionAndUser.user.id,
        },
        [0, 0],
        {
          token: token || '',
        },
      );

      return {
        props: {
          boards: response.data,
        },
      };
    } catch (e) {
      return {
        props: {
          boards: [],
        },
      };
    }
  }

  return {
    props: {
      boards: [],
    },
  };
}
