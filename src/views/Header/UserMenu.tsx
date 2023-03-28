import DefaultHeader from './default';
import LoggedHeader from './logged/LoggedHeader';

import { useSession } from 'next-auth/react';

type UserMenuProps = {};

const UserMenu: React.FC<UserMenuProps> = () => {
  const { data: session } = useSession();

  return session ? <LoggedHeader userData={session.user} /> : <DefaultHeader />;
};

export default UserMenu;
