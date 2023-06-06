'use client';

import Link from 'next/link';
import DefaultHeader from './default/DefaultHeader';
import LoggedHeader from './logged/LoggedHeader';

import { useAtomValue } from 'jotai';
import { userStateAtom } from '@/context/stateManager';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const user = useAtomValue(userStateAtom);
  return (
    <div className="relative p-4 w-full flex justify-between items-center z-3200 h-[var(--header-height)]">
      <Link href="/" className="rounded-3xl no-underline">
        <h1 className="header_h1 text-3xl">TaskerMan</h1>
      </Link>
      {user ? <LoggedHeader /> : <DefaultHeader />}
    </div>
  );
};

export default Header;
