import DefaultHeader from './default';
import LoggedHeader from './logged/LoggedHeader';

import { useSession } from 'next-auth/react';

type UserMenuProps = {};

const UserMenu: React.FC<UserMenuProps> = () => {
  const { data, status } = useSession();

  return status === 'authenticated' && data.user ? (
    <LoggedHeader userData={data.user} />
  ) : (
    <DefaultHeader />
  );
};

export default UserMenu;
