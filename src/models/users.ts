import mongoose from 'mongoose';

import { Types, Model } from 'mongoose';

import type { TLoginType, TUserRoles } from '@/types/db';

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  displayName?: string;
  externalLogin: TLoginType;
  email: string;
  subs: Types.ObjectId[];
  imageURL?: string;
  nameAlias: string;
  roles: TUserRoles[];
}

const UserScheme = new mongoose.Schema<IUser, Model<IUser>>(
  {
    username: { type: String, unique: true, require: false },
    password: { type: String, required: false },
    displayName: {
      type: String,
      default: '',
    },
    externalLogin: { type: String, require: false, default: 'credentials' },
    email: { type: String, unique: true, require: true },
    subs: [{ type: Types.ObjectId, ref: 'boards' }],
    imageURL: {
      type: String,
      default: '',
    },
    nameAlias: { type: String, require },
    roles: { type: [], required: true, default: ['user'] },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

export default (mongoose.models['Users'] as Model<IUser>) ||
  mongoose.model('Users', UserScheme);
