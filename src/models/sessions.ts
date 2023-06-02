import { Schema, Model } from 'mongoose';
import { IUser } from './users';
import { SESSION_MAX_AGE_DAYS } from '@/utils/constants';
import { getAgeInSec } from '@/libs/server.helpers';

export interface ISession {
  _id: string;
  sessionToken: string;
  userId: Schema.Types.ObjectId | IUser;
  expires: Date;
}

export const SessionScheme = new Schema<ISession, Model<ISession>>(
  {
    sessionToken: {
      type: String,
      required: true,
      unique: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expires: {
      type: Date,
      default: Date.now(),
      index: {
        expireAfterSeconds: getAgeInSec({ days: SESSION_MAX_AGE_DAYS }),
      },
    },
  },
  {
    timestamps: true,
    collection: 'sessions',
  },
);
