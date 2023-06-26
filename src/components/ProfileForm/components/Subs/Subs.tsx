'use client';

import SingleSub from './SingleSub';
import SubsMap from './SubsMap';
import cls from 'classnames';

import { useAtom, useAtomValue } from 'jotai';
import {
  boardsStateAtom,
  getSetProfileSubsActiveAtom,
  initialProfileSub,
} from '@/context/stateManager';
import { useEffect, useRef, useState } from 'react';
import {
  LAPTOP_MEDIA_POINT_WIDTH,
  PROFILE_SUBS_SLIDE_WIDTH,
} from '@/utils/constants';

import type { MouseEvent as ReactMouseEvent } from 'react';

type SubsIteratorProps = {};

const SubsIterator: React.FC<SubsIteratorProps> = () => {
  const subs = useAtomValue(boardsStateAtom);
  const [activeSlide, setActive] = useAtom(getSetProfileSubsActiveAtom);
  const subsLengthRef = useRef<number>(subs.length);
  const [isSubsMapDisplayed, setIsSubsMapDisplayed] = useState(false);

  const [isMouseSlideStart, setIsMouseSlideStart] = useState(false);
  const [mouseSlideCoords, setMouseSlideCoords] = useState(0);

  const mouseDown = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'DIV') {
      return;
    }

    setIsMouseSlideStart(true);
    setMouseSlideCoords(e.pageX);
  };

  const mouseUp = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsMouseSlideStart(false);

    const target = e.target as HTMLElement;
    if (target.tagName !== 'DIV') {
      return;
    }

    const direction = Math.sign(e.pageX - mouseSlideCoords);

    if (direction < 0) {
      if (activeSlide.index >= subs.length - 1) {
        return;
      }
    }

    if (direction > 0) {
      if (activeSlide.index <= 0) {
        return;
      }
    }

    const rawIndex = activeSlide.index - direction;
    const newIndex = Math.abs(rawIndex);

    const coords = PROFILE_SUBS_SLIDE_WIDTH * direction;
    setActive({
      coords: activeSlide.coords + coords,
      index: newIndex,
    });
  };

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < LAPTOP_MEDIA_POINT_WIDTH) {
        setIsSubsMapDisplayed(false);
      } else {
        setIsSubsMapDisplayed(true);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (subsLengthRef.current === subs.length || !isSubsMapDisplayed) {
      return;
    }

    if (subsLengthRef.current < subs.length) {
      setActive({
        index: subs.length - 1,
        coords: (subs.length - 1) * PROFILE_SUBS_SLIDE_WIDTH * -1,
      });
    }

    if (subsLengthRef.current >= subs.length) {
      if (activeSlide.index === subs.length) {
        setActive({
          index: subs.length - 1,
          coords: (subs.length - 1) * PROFILE_SUBS_SLIDE_WIDTH * -1,
        });
      }
    }

    subsLengthRef.current = subs.length;
  }, [activeSlide.index, isSubsMapDisplayed, setActive, subs.length]);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < LAPTOP_MEDIA_POINT_WIDTH) {
        if (activeSlide.coords) {
          setActive(initialProfileSub);
        }
      }
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line
  }, [activeSlide.coords]);

  return (
    <div
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      className={cls(
        `mt-2  
      relative 
      desktop:mt-2 
      laptop:overflow-visible
      laptop:block 
      laptop:w-full
      transition-transform
      duration-500 
      grid
      grid-flow-col
      auto-cols-[465px]`,
      )}
      style={{
        transform: `translate(${activeSlide.coords}px, 0)`,
        cursor: isMouseSlideStart ? 'grabbing' : 'grab',
      }}
    >
      {subs.map((board) => {
        return <SingleSub board={board} key={board._id} />;
      })}
    </div>
  );
};

type SubsProps = {};

const Subs: React.FC<SubsProps> = () => {
  return (
    <div>
      <h3
        className="w-full text-center
        text-lg
        font-bold 
        p-1
        rounded-md 
        bg-black-aqua"
      >
        Subs
      </h3>
      <SubsMap />
      <SubsIterator />
    </div>
  );
};

export default Subs;
