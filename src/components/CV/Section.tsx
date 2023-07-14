'use client';

import cls from 'classnames';

import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Popup } from './Popup';

import type { TPopupType } from './Popup';

type SectionProps = {
  type: TPopupType;
  classNames?: string;
  innerClasses?: string;
};

const Section: React.FC<PropsWithChildren<SectionProps>> = ({
  children,
  type,
  classNames,
  innerClasses,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [popup, setPopup] = useState({
    isOpen: false,
    x: 0,
    y: 0,
  });

  const closePopup = () => {
    setPopup({
      isOpen: false,
      x: 0,
      y: 0,
    });
  };

  useEffect(() => {
    const container = containerRef.current!;
    let time: NodeJS.Timeout | null = null;
    const mouseEnter = (event: MouseEvent) => {
      if (popup.isOpen) return;

      setPopup({
        isOpen: true,
        x: event.x,
        y: event.y,
      });
    };

    const mouseLeave = () => {
      time = setTimeout(() => {
        closePopup();
      }, 400);
    };
    container.addEventListener('mouseenter', mouseEnter);
    container.addEventListener('mouseleave', mouseLeave);

    return () => {
      if (time) {
        clearTimeout(time);
      }

      container.removeEventListener('mouseenter', mouseEnter);
      container.removeEventListener('mouseleave', mouseLeave);
    };
  }, [popup.isOpen]);

  return (
    <section ref={containerRef} className={cls('w-fit', classNames)}>
      {children}
      {popup.isOpen && (
        <Popup x={popup.x} y={popup.y} type={type} classNames={innerClasses} />
      )}
    </section>
  );
};

export { Section };
