import { Schema, Model } from 'mongoose';

import { IUser } from './users';

export type TUserBoardRoles = 'guest' | 'owner' | 'admin' | 'member';

export interface IBoardMember {
  role: TUserBoardRoles;
  user: IUser;
}

export interface IBoard {
  _id: string;
  title: string;
  bg: string;
  owner: IUser;
  members: IBoardMember[];
  pendingMembers: Schema.Types.ObjectId[] | IBoard[];
}

interface IBoardMethods {}

export const BoardScheme = new Schema<IBoard, Model<IBoard>, IBoardMethods>(
  {
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        role: {
          type: String,
          default: 'guest',
        },
      },
    ],
    title: { type: String, required: true },
    bg: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // ! send board invite -> invited client's ID put to pending.
    // ! agree from invited client -> ID to memberIds
    // ! and boardId to SUBS array of the client
    pendingMembers: [
      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ],
  },
  {
    timestamps: true,
    collection: 'boards',
  },
);
