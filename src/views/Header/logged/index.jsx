import { createContext, useRef } from 'react';

import { Menu } from './components/menu';

const ParentRefContext = createContext(null);

function LoggedHeader() {
  const sectionRef = useRef(null);

  // TODO refactor Menu for HOC and pass ref through forwardRef instead of context
  return (
    <ParentRefContext.Provider value={sectionRef}>
      <nav className="userSection" ref={sectionRef}>
        <Menu />
      </nav>
    </ParentRefContext.Provider>
  );
}

export { LoggedHeader, ParentRefContext };
