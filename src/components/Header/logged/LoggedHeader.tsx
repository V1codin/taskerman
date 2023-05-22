'use client';

import Menu from './components/Menu';

import { useRef } from 'react';
import { SessionUser } from '@/types/db';

type LoggedHeaderProps = {
  userData: SessionUser;
};

const LoggedHeader: React.FC<LoggedHeaderProps> = ({ userData }) => {
  const navRef = useRef<HTMLElement | null>(null);

  return (
    <nav className="flex items-center fixed right-10 z-[7000]" ref={navRef}>
      <Menu user={userData} containerRef={navRef} />
    </nav>
  );
};

export default LoggedHeader;
