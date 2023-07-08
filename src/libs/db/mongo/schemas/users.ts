import { Schema, Model } from 'mongoose';

import type { TUser } from './types';

interface TUserMethods {}

export const UserScheme = new Schema<TUser, Model<TUser>, TUserMethods>(
  {
    pendingInvites: {
      type: [String],
      required: true,
      default: [],
    },
    username: { type: String, unique: true, require: true },
    displayName: {
      type: String,
      default: '',
    },
    email: { type: String, unique: true, require: true },
    subs: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
    imageURL: {
      type: String,
      default: '',
    },
    nameAlias: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

UserScheme.set('toJSON', {
  virtuals: true,
});
