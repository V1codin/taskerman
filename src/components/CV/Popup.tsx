'use client';

import './index.css';

import cls from 'classnames';

import { TS, VS_CODE } from './TSTemplatesToInsert';

export type TPopupType = 'TS' | 'VS_CODE';

const map: Record<TPopupType, string> = {
  TS: TS,
  VS_CODE: VS_CODE,
};

type PopupProps = {
  x: number;
  y: number;
  type: TPopupType;
  classNames?: string;
};

const Popup: React.FC<PopupProps> = ({ x, y, type, classNames }) => {
  return (
    <div
      className={cls(
        'absolute w-[525px] p-3 rounded-lg bg-[#22272e] max-h-[70vh] overflow-y-scroll animated',
        classNames,
      )}
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
      dangerouslySetInnerHTML={{ __html: map[type] }}
    ></div>
  );
};

export { Popup };
