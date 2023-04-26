import RightButton from '@/modules/button/RightButton';
import LeftButton from '@/modules/button/LeftButton';

import { useAtom, useAtomValue } from 'jotai';
import {
  boardsStateAtom,
  getSetProfileSubsActiveAtom,
} from '@/context/stateManager';
import { useEffect, useMemo, useRef } from 'react';
import { degreesToRadians, getProfileActiveSubByIndex } from '@/utils/helpers';
import { StyledSubsMap } from '../../styledProfile';
import {
  PROFILE_SUBS_SLIDE_WIDTH,
  SUBS_MAP_LINE_WIDTH,
} from '@/utils/constants';
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

    const context = canvas.getContext('2d');
    context!.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 30;

    subs.map((_, index) => {
      const startAngle = index * arcAngle - Math.PI / 2;
      const endAngle = startAngle + arcAngle;
      const color = active.index === index ? '#00FFFF' : 'grey';

      context!.beginPath();
      context!.arc(centerX, centerY, radius, startAngle, endAngle, false);
      context!.lineWidth = SUBS_MAP_LINE_WIDTH;
      context!.strokeStyle = color;
      context!.stroke();

      // ? dividers
      const x1 =
        centerX + Math.cos(endAngle) * (radius - SUBS_MAP_LINE_WIDTH / 2);
      const y1 =
        centerY + Math.sin(endAngle) * (radius - SUBS_MAP_LINE_WIDTH / 2);

      const dividerAngle = (endAngle * 180) / Math.PI;

      const x2 =
        x1 + Math.cos((Math.PI * dividerAngle) / 180) * SUBS_MAP_LINE_WIDTH;
      const y2 =
        y1 + Math.sin((Math.PI * dividerAngle) / 180) * SUBS_MAP_LINE_WIDTH;

      context!.beginPath();
      context!.lineWidth = 3;
      context!.strokeStyle = '#d9d9d9';
      context!.moveTo(x1, y1);
      context!.lineTo(x2, y2);
      context!.stroke();
    });

    const canvasClick = (event: MouseEvent) => {
      const clickX = event.offsetX;
      const clickY = event.offsetY;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const distanceFromCenter = Math.sqrt(
        Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2),
      );

      const segments = subs.length;

      if (
        distanceFromCenter > radius - radius / 2 / 2 &&
        distanceFromCenter < radius + radius / 2 / 2
      ) {
        // ? + Math.PI / 2 is compensation angle from arcAngle - Math.PI / 2; line 65
        const angle =
          Math.atan2(clickY - centerY, clickX - centerX) + Math.PI / 2;

        let index = Math.floor((angle / (2 * Math.PI)) * segments);

        // ? angle on top left quadrant is gonna be from 0 to -1
        if (index < 0) {
          index += segments;
        }

        if (index === segments) {
          index = segments;
        }

        if (index === active.index) {
          return;
        }

        const newActiveSub = getProfileActiveSubByIndex(index, active);
        setActive(newActiveSub);
      }
    };

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
