import RightButton from '@/modules/button/RightButton';
import LeftButton from '@/modules/button/LeftButton';

import { useAtom, useAtomValue } from 'jotai';
import {
  boardsStateAtom,
  getSetProfileSubsActiveAtom,
} from '@/context/stateManager';
import { useEffect, useMemo, useRef } from 'react';
import { clearCanvas, degreesToRadians } from '@/utils/helpers';
import { StyledSubsMap } from '../../styledProfile';
import { PROFILE_SUBS_SLIDE_WIDTH } from '@/utils/constants';
import { drawArc, drawArcDivider, getCanvasClick } from './subsMapHelpers';
import type { MouseEvent as ReactMouseEvent } from 'react';

type SubsMapProps = {};

const SubsMap: React.FC<SubsMapProps> = () => {
  const subs = useAtomValue(boardsStateAtom);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const arcAngle = useMemo(
    () => degreesToRadians(Math.round(360 / subs.length)),
    [subs.length],
  );

  const [active, setActive] = useAtom(getSetProfileSubsActiveAtom);

  const rightClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (active.index >= subs.length - 1) {
      return;
    }

    setActive({
      ...active,
      index: active.index + 1,
      coords: active.coords - PROFILE_SUBS_SLIDE_WIDTH,
    });
  };

  const leftClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (active.index <= 0) {
      return;
    }

    setActive({
      ...active,
      index: active.index - 1,
      coords: active.coords + PROFILE_SUBS_SLIDE_WIDTH,
    });
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;

    const context = canvas.getContext('2d')!;
    clearCanvas(context, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 30;

    subs.map((_, index) => {
      const startAngle = index * arcAngle - Math.PI / 2;
      const endAngle = startAngle + arcAngle;
      const color = active.index === index ? '#00FFFF' : 'grey';

      drawArc(context, {
        centerX,
        centerY,
        radius,
        startAngle,
        endAngle,
        color,
      });

      drawArcDivider(context, { centerX, centerY, radius, endAngle });
    });

    const canvasClick = getCanvasClick({
      width: canvas.width,
      height: canvas.height,
      active,
      radius,
      segmentNumber: subs.length,
      setActive,
    });

    canvas.addEventListener('click', canvasClick);

    return () => {
      canvas.removeEventListener('click', canvasClick);
    };
  }, [active, active.index, arcAngle, setActive, subs]);

  return subs.length > 0 ? (
    <StyledSubsMap>
      <LeftButton
        attrs={{
          type: 'button',
          onClick: leftClick,
          disabled: active.index <= 0,
        }}
        styles={{
          position: 'relative',
          left: '2px',
          top: 0,
          boxShadow: 'none',
        }}
      />
      <canvas ref={canvasRef} width={100} height={100}></canvas>
      <RightButton
        attrs={{
          disabled: active.index >= subs.length - 1,
          type: 'button',
          onClick: rightClick,
        }}
        styles={{
          position: 'relative',
          right: '2px',
          top: 0,
          boxShadow: 'none',
        }}
      />
    </StyledSubsMap>
  ) : null;
};

export default SubsMap;
