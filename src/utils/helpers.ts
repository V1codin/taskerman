// @ts-ignore
import image_1 from '@/assets/info_img1.jpg?url';
// @ts-ignore
import image_2 from '@/assets/info_img2.jpg?url';
// @ts-ignore
import image_3 from '@/assets/info_img3.jpg?url';
// @ts-ignore
import image_4 from '@/assets/info_img4.jpg?url';
// @ts-ignore
import image_5 from '@/assets/info_img5.jpg?url';

import { IMasks } from '../../types/helpers';

export const masks: IMasks = {
  username: /^[a-zA-Z0-9]{4,16}$/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{4,16}$/,
  confirmPassword: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{4,16}$/,
  displayName: /^[A-Z]{1}\w{1,10}\s{1}[A-Z]{1}\w{1,11}$/,
  email: /^[a-zA-Z\d]{1,15}@[a-z]{1,9}\.{1}([a-z]{2,4}){1}$/,
};

export const warns = {
  username: 'Username must be from 4 to 16 numbers of latin characters',
  password:
    'Your password must be 4-16 characters, and include at least one number.',
  displayName:
    'Enter your name and surname divided by space. First letters are capital :)',
  confirmPassword: 'Passwords should match',
  email: 'Invalid email',
};

export const isLink = (str: string) => {
  return /^https:\/\/images\.unsplash\.com\/.{1,}/g.test(str);
};

export const imagesForInfoDropDown: {
  url: string;
  title: string;
  changeTipTitle: string;
}[] = [
  {
    url: image_1,
    title: 'Falling down is an accident, staying down is a choice.',
    changeTipTitle: 'Get a new tip',
  },
  {
    url: image_2,
    title: "Tough times don't last, tough people do.",
    changeTipTitle: 'Get a new tip',
  },
  {
    url: image_3,
    title: 'Stay in touch.',
    changeTipTitle: 'Get a new tip',
  },
  {
    url: image_4,
    title: 'Strive for progress not perfection.',
    changeTipTitle: 'Get a new tip',
  },
  {
    url: image_5,
    title: "Don't look back, you're not going that way.",
    changeTipTitle: 'Get a new tip',
  },
];

export const getExpireDateDiff = (expireDate: string) => {
  const expiresTime = new Date(expireDate).getTime();
  const nowTime = new Date().getTime();
  const diff = expiresTime - nowTime;

  return diff;
};

export const reloadSession = () => {
  const event = new Event('visibilitychange');
  document.dispatchEvent(event);
};

type TMaxAgeProps = {
  days?: number;
  mins?: number;
  hours?: number;
  seconds?: number;
};

export const getAgeInSec = ({
  days,
  mins,
  hours,
  seconds,
}: TMaxAgeProps = {}) => {
  const daysInSec = days ? days * 60 * 60 * 24 : 0;
  const minsInSec = mins ? mins * 60 : 0;
  const hoursInSec = hours ? hours * 60 * 60 : 0;
  const sec = seconds || 0;

  return daysInSec + minsInSec + hoursInSec + sec;
};
