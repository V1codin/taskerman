'use client';

import SingleSub from './SingleSub';
import SubsMap from './SubsMap';

import { useAtom, useAtomValue } from 'jotai';
import {
  boardsStateAtom,
  getSetProfileSubsActiveAtom,
  initialProfileSub,
} from '@/context/stateManager';
import { useEffect } from 'react';
import { FIRST_MEDIA_POINT_WIDTH } from '@/utils/constants';

type SubsIteratorProps = {};

const SubsIterator: React.FC<SubsIteratorProps> = () => {
  const subs = useAtomValue(boardsStateAtom);
  const [activeSlide, setActive] = useAtom(getSetProfileSubsActiveAtom);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < FIRST_MEDIA_POINT_WIDTH) {
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
      className="mt-2  
      relative 
      desktop:mt-2 
      laptop:overflow-visible
      laptop:block 
      laptop:w-full
      transition-transform
      duration-500 
      grid
      grid-flow-col
      auto-cols-[465px]
      "
      style={{
        transform: `translate(${activeSlide.coords}px, 0)`,
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
