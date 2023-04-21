import CustomHead from '@/modules/head/CustomHead';
import Header from '@/views/Header/Header';

import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/hooks';
import { Process } from '@/modules/process/Process';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { getSetModal, getSetUserStateAtom } from '@/context/stateManager';

type DefaultLayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { data, status } = useSession();

  const { setToast } = useToast();
  const setModalState = useSetAtom(getSetModal);
  const setUser = useSetAtom(getSetUserStateAtom);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setToast({
        typeClass: 'warning',
        message: 'Please login into your account',
      });

      setModalState({
        isOpen: true,
        window: {
          type: 'auth',
          view: 'login',
        },
      });

      return;
    }

    if (status === 'authenticated') {
      setUser(data.user);
    }
  }, [data?.user, setModalState, setToast, setUser, status]);

  return status === 'loading' ? (
    <Process
      isBordered={true}
      styles={{
        marginTop: '15%',
      }}
    />
  ) : (
    <>
      <CustomHead />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
