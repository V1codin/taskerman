import { Schema, Model } from 'mongoose';

export interface ICard {
  _id: string;
  boardId: Schema.Types.ObjectId;
  listId: Schema.Types.ObjectId;
  text: string;
}

export const CardScheme = new Schema<ICard, Model<ICard>>(
  {
    boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
    listId: { type: Schema.Types.ObjectId, ref: 'List' },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'cards',
  },
);
