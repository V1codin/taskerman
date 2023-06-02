'use client';

import Menu from './components/Menu';

import { useRef } from 'react';

type LoggedHeaderProps = {};

const LoggedHeader: React.FC<LoggedHeaderProps> = () => {
  const navRef = useRef<HTMLElement | null>(null);

  return (
    <nav className="flex items-center fixed right-10 z-[7000]" ref={navRef}>
      <Menu containerRef={navRef} />
    </nav>
  );
};

export default LoggedHeader;
