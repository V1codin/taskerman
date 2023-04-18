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

import { credentialsSignUpSchema } from '@/types/state';

import { randomUUID } from 'crypto';
import { TAuthProviderProfiles } from 'next-auth';

export const isLink = (str: string = '') => {
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

export const generate = {
  uuid() {
    return this.uuidv4();
  },
  uuidv4() {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        // @ts-ignore
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16),
    );
  },
};

export const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000);
};

export const generateSessionToken = () => {
  return randomUUID?.() ?? generate.uuid();
};

export const validateNewUserBySchema = (type: TSignUp, body: unknown) => {
  if (type === 'credentials') {
    return credentialsSignUpSchema.safeParse(body);
  }

  // TODO for google auth type etc.
  return {
    success: false,
  };
};

// ? profile: any because different auth providers send different prop names
export const getProfileDataOfAuthProvider = (
  type: TSignUp,
  profile: TAuthProviderProfiles,
) => {
  if (type === 'google') {
    return {
      id: profile.sub,
      displayName: profile.name,
      email: profile.email,
      imageURL: profile.picture,
      nameAlias: `${profile.name} ${profile.email}`,
      subs: [],
    };
  }

  return {
    id: profile['id'],
  };
};
