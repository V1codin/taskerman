import { Schema, Model } from 'mongoose';
import { IUser } from './users';

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
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'sessions',
  },
);
