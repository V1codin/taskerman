import { Schema, Model } from 'mongoose';

export interface IList {
  _id: string;
  title: string;
  board: Schema.Types.ObjectId;
  cards: Schema.Types.ObjectId;
}

export const ListScheme = new Schema<IList, Model<IList>>(
  {
    title: { type: String, required: true },
    board: { type: Schema.Types.ObjectId, ref: 'Board' },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  },
  {
    timestamps: true,
    collection: 'lists',
  },
);
