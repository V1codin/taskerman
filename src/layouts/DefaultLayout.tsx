import CustomHead from '@/modules/head/CustomHead';
import Header from '@/views/Header/Header';

import { useSessionFromServer, useToast } from '@/hooks/hooks';
import { Process } from '@/modules/process/Process';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { getSetBoardsState, getSetModal } from '@/context/stateManager';

type DefaultLayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { data, error, isLoading } = useSessionFromServer();
  const { setToast } = useToast();
  const setModalState = useSetAtom(getSetModal);
  const setBoards = useSetAtom(getSetBoardsState);

  useEffect(() => {
    if (data && data?.user) {
      setBoards(data.user.subs);
    }
  }, [data, setBoards]);

  useEffect(() => {
    if (error) {
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
  }, [error, setModalState, setToast]);

  return isLoading ? (
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
