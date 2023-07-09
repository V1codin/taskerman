import { Schema, Model } from 'mongoose';

import type { TBoard, TBoardPermissions, TUserBoardRoles } from './types';

export const BOARD_MEMBER_ROLES_PERMISSIONS: Record<
  TUserBoardRoles,
  TBoardPermissions
> = {
  guest: {
    invite_members: false,
  },
  owner: {
    invite_members: true,
  },
  admin: {
    invite_members: true,
  },
  member: {
    invite_members: true,
  },
};

interface TBoardMethods {}

export const BoardScheme = new Schema<TBoard, Model<TBoard>, TBoardMethods>(
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
        isPending: {
          type: Boolean,
          default: true,
          required: true,
        },
      },
    ],
    title: { type: String, required: true },
    bg: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // ! send board invite -> invited client's ID put to pending.
    // ! agree from invited client -> ID to memberIds
    // ! and boardId to SUBS array of the client
  },
  {
    timestamps: true,
    collection: 'boards',
  },
);

BoardScheme.set('toJSON', {
  virtuals: true,
});
