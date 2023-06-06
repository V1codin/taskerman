'use client';

import Menu from './components/Menu';

import { useRef } from 'react';

type LoggedHeaderProps = {};

const LoggedHeader: React.FC<LoggedHeaderProps> = () => {
  const navRef = useRef<HTMLElement | null>(null);

  return (
    <nav
      className="flex items-center fixed right-10 z-[3200] mobile:right-3"
      ref={navRef}
    >
      <Menu containerRef={navRef} />
    </nav>
  );
};

export default LoggedHeader;
