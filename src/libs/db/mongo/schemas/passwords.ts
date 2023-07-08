import { Schema, Model } from 'mongoose';

import type { IPassword } from './types';

export const PasswordScheme = new Schema<IPassword, Model<IPassword>>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pw: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'passwords',
  },
);

PasswordScheme.set('toJSON', {
  virtuals: true,
});
