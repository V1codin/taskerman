import cls from 'classnames';

import { useEffect, useRef } from 'react';

import type { MutableRefObject, PropsWithChildren } from 'react';

type FocusTrapProps = {
  containerClassNames: string;
  firstElementRef?: MutableRefObject<HTMLElement | null>;
};

const defaultClassNames = cls('');

const FocusTrap: React.FC<PropsWithChildren<FocusTrapProps>> = ({
  children,
  containerClassNames,
  firstElementRef,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    const focusin = (ev: FocusEvent) => {
      if (!container!.contains(ev.relatedTarget as Node)) {
        const innerChild =
          firstElementRef?.current || (container?.firstChild as HTMLElement);
        innerChild?.focus();
      }
    };

    window.addEventListener('focusin', focusin);

    if (container) {
      const innerChild =
        firstElementRef?.current || (container.firstChild as HTMLElement);
      innerChild.setAttribute('tabindex', '0');
    }

    return () => {
      window.removeEventListener('focusin', focusin);
    };
  });

  return (
    <section
      className={cls(defaultClassNames, containerClassNames)}
      ref={containerRef}
    >
      {children}
    </section>
  );
};

export default FocusTrap;
