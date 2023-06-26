import { Schema, Model } from 'mongoose';

import type { IBoard } from './boards';

export interface IUser {
  _id: string;
  username: string;
  displayName?: string;
  email: string;
  subs: string[] | IBoard[];
  imageURL?: string;
  nameAlias: string;
  pendingInvites: string[];
}

export type TEditableUserProps =
  | Required<Pick<IUser, 'displayName'>>
  | Required<Pick<IUser, 'imageURL'>>;

interface IUserMethods {}

export const UserScheme = new Schema<IUser, Model<IUser>, IUserMethods>(
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
