import mongoose from 'mongoose';

import { Types, Model } from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  displayName?: string;
  externalLogin: string;
  email: string;
  subs: Types.ObjectId[];
  imageURL?: string;
  nameAlias: string;
}

const UserScheme = new mongoose.Schema<IUser, Model<IUser>>(
  {
    username: { type: String, unique: true, require: false },
    password: { type: String, required: false },
    displayName: {
      type: String,
      default: '',
    },
    externalLogin: { type: String, require: false, default: 'local' },
    email: { type: String, unique: true, require: true },
    subs: [{ type: Types.ObjectId, ref: 'boards' }],
    imageURL: {
      type: String,
      default: '',
    },
    nameAlias: { type: String, require },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

export default (mongoose.models['Users'] as mongoose.Model<IUser>) ||
  mongoose.model('Users', UserScheme);
