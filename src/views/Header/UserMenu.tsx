import DefaultHeader from './default';
import LoggedHeader from './logged/LoggedHeader';

import { SessionUser } from '@/types/db';

type UserMenuProps = {
  user: SessionUser | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  return user ? <LoggedHeader userData={user} /> : <DefaultHeader />;
};

export default UserMenu;
