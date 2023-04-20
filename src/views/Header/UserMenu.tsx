import { useAtomValue } from 'jotai';
import DefaultHeader from './default';
import LoggedHeader from './logged/LoggedHeader';

import { getSetUserStateAtom } from '@/context/stateManager';

type UserMenuProps = {};

const UserMenu: React.FC<UserMenuProps> = () => {
  const user = useAtomValue(getSetUserStateAtom);
  return user ? <LoggedHeader userData={user} /> : <DefaultHeader />;
};

export default UserMenu;
