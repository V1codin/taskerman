import { Schema, Model } from 'mongoose';

export interface IPassword {
  _id: string;
  user: Schema.Types.ObjectId;
  pw: string;
}

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
