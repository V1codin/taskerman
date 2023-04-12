import { Schema, Model } from 'mongoose';
import type { TLoginType } from '@/types/db';
import type { IBoard } from './boards';

export interface IUser {
  _id: string;
  username: string;
  displayName?: string;
  externalLogin: TLoginType;
  email: string;
  subs: Schema.Types.ObjectId[] | IBoard[];
  imageURL?: string;
  nameAlias: string;
}

export const UserScheme = new Schema<IUser, Model<IUser>>(
  {
    username: { type: String, unique: true, require: true },
    displayName: {
      type: String,
      default: '',
    },
    externalLogin: { type: String, require: false, default: 'credentials' },
    email: { type: String, unique: true, require: true },
    subs: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
    imageURL: {
      type: String,
      default: '',
    },
    nameAlias: { type: String, require: true },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);
