import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBoard extends Document {
  title: string;
  bg: string;
  ownerId: mongoose.Types.ObjectId;
  memberIds: string[];
  pendingMemberIds: string[];
}

const BoardScheme = new Schema<IBoard, Model<IBoard>>(
  {
    title: { type: String, required: true },
    bg: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'users' },
    // ? prev
    // ? memberIds: [{ type: Schema.Types.ObjectId, ref: "users" }],
    memberIds: [{ type: String }],

    // ! send board invite -> invited client's ID put to pending.
    // ! agree from invited client -> ID to memberIds
    // ! and boardId to SUBS array of the client
    pendingMemberIds: [{ type: String }],
  },
  {
    timestamps: true,
    collection: 'boards',
  },
);

export default (mongoose.models['Board'] as mongoose.Model<IBoard>) ||
  mongoose.model('Board', BoardScheme);
