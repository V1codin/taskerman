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

import { TProfileActiveSub } from '@/types/state';

import { PROFILE_SUBS_SLIDE_WIDTH, RAINBOW_COLORS } from './constants';

export const isLink = (str: string = '') => {
  return /^(http|https):\/\/[^ "]+/g.test(str);
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

const isImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = src;

    img.onload = () => resolve(src);

    img.onerror = () => {
      reject('Your link has no image');
    };
  });
};

export const getDataFromClipBoard = async () => {
  try {
    const link = await navigator.clipboard.readText();
    if (!isLink(link)) return Promise.reject('Your link has no image');

    const result = await isImage(link);
    return result;
  } catch (e) {
    throw e;
  }
};

export const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

export const getRainbowColor = (index: number) => {
  if (index >= RAINBOW_COLORS.length) {
    return (
      RAINBOW_COLORS[RAINBOW_COLORS.length - (index % RAINBOW_COLORS.length)] ||
      RAINBOW_COLORS[0]
    );
  }

  return RAINBOW_COLORS[index] || RAINBOW_COLORS[0];
};

export const getProfileActiveSubByIndex = (
  index: number,
  activeSlide: TProfileActiveSub,
): TProfileActiveSub => {
  const diff = activeSlide.index - index;
  const diffSign = Math.sign(diff);
  const diffAbsolute = Math.abs(diff);

  const newCoords =
    activeSlide.coords + diffSign * diffAbsolute * PROFILE_SUBS_SLIDE_WIDTH;

  return {
    coords: newCoords,
    index,
  };
};

export const clearCanvas = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  context.clearRect(0, 0, width, height);
};
