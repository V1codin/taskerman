import CustomHead from '@/modules/head/CustomHead';
import Header from '@/views/Header/Header';

import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/hooks';
import { Process } from '@/modules/process/Process';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { getSetModal } from '@/context/stateManager';

type DefaultLayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { data, status } = useSession();

  const { setToast } = useToast();
  const setModalState = useSetAtom(getSetModal);

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
    }
  }, [setModalState, setToast, status]);

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
      <Header user={data?.user || null} />
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
