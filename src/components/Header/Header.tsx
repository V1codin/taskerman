import Link from 'next/link';
import DefaultHeader from './default/DefaultHeader';
import LoggedHeader from './logged/LoggedHeader';

import type { SessionUser } from '@/types/db';

type HeaderProps = {
  user: SessionUser | null;
};

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <div className="relative p-4 w-full flex justify-between items-center z-50 min-h-[65px]">
      <Link href="/" className="rounded-3xl no-underline">
        <h1 className="header_h1 text-3xl">TaskerMan</h1>
      </Link>
      {user ? <LoggedHeader userData={user} /> : <DefaultHeader />}
    </div>
  );
};

export default Header;
