import { credentialsSignUpSchema } from '@/types/state';
import { randomUUID } from 'crypto';

import type { TAuthProviderProfiles } from 'next-auth';

export const isLink = (str: string = '') => {
  return /^(http|https):\/\/[^ "]+/g.test(str);
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

export const generateSessionToken = () => {
  return randomUUID?.() ?? generate.uuid();
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

export const validateNewUserBySchema = (type: TSignUp, body: unknown) => {
  if (type === 'credentials') {
    return credentialsSignUpSchema.safeParse(body);
  }

  // TODO for google auth type etc.
  return {
    success: false,
  };
};

export const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000);
};
