import { TProfileActiveSub } from '@/types/state';
import { SUBS_MAP_LINE_WIDTH } from '@/utils/constants';
import { getProfileActiveSubByIndex } from '@/utils/helpers';

type TArcProps = {
  centerX: number;
  centerY: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  color: string;
};

type TArcDividerProps = Omit<TArcProps, 'color' | 'startAngle'>;

type TCanvasHandlerProps = {
  width: number;
  height: number;
  segmentNumber: number;
  radius: number;
  active: TProfileActiveSub;
  setActive: (arg: TProfileActiveSub) => void;
};

export const drawArc = (
  context: CanvasRenderingContext2D,
  { centerX, centerY, radius, startAngle, endAngle, color }: TArcProps,
) => {
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle, false);
  context.lineWidth = SUBS_MAP_LINE_WIDTH;
  context.strokeStyle = color;
  context.stroke();
};

export const drawArcDivider = (
  context: CanvasRenderingContext2D,
  { centerX, centerY, radius, endAngle }: TArcDividerProps,
) => {
  const x1 = centerX + Math.cos(endAngle) * (radius - SUBS_MAP_LINE_WIDTH / 2);
  const y1 = centerY + Math.sin(endAngle) * (radius - SUBS_MAP_LINE_WIDTH / 2);

  const dividerAngle = (endAngle * 180) / Math.PI;

  const x2 =
    x1 + Math.cos((Math.PI * dividerAngle) / 180) * SUBS_MAP_LINE_WIDTH;
  const y2 =
    y1 + Math.sin((Math.PI * dividerAngle) / 180) * SUBS_MAP_LINE_WIDTH;

  context.beginPath();
  context.lineWidth = 3;
  context.strokeStyle = '#d9d9d9';
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};

export const getCanvasClick = ({
  width,
  height,
  segmentNumber,
  radius,
  active,
  setActive,
}: TCanvasHandlerProps) => {
  return (event: MouseEvent) => {
    event.preventDefault();

    const clickX = event.offsetX;
    const clickY = event.offsetY;

    const centerX = width / 2;
    const centerY = height / 2;

    const distanceFromCenter = Math.sqrt(
      Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2),
    );

    if (
      distanceFromCenter > radius - radius / 2 / 2 &&
      distanceFromCenter < radius + radius / 2 / 2
    ) {
      // ? + Math.PI / 2 is compensation angle from arcAngle - Math.PI / 2; line 65
      const angle =
        Math.atan2(clickY - centerY, clickX - centerX) + Math.PI / 2;

      let index = Math.floor((angle / (2 * Math.PI)) * segmentNumber);

      // ? angle on top left quadrant is gonna be from 0 to -1
      if (index < 0) {
        index += segmentNumber;
      }

      if (index === segmentNumber) {
        index = segmentNumber;
      }

      if (index === active.index) {
        return;
      }

      const newActiveSub = getProfileActiveSubByIndex(index, active);
      setActive(newActiveSub);
    }
  };
};
