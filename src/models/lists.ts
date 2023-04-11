import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IList extends Document {
  title: string;
  boardId: mongoose.Types.ObjectId;
  cards: mongoose.Types.ObjectId;
}

const ListScheme = new Schema<IList, Model<IList>>(
  {
    title: { type: String, required: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'boards' },
    cards: [{ type: Schema.Types.ObjectId, ref: 'cards' }],
  },
  {
    timestamps: true,
    collection: 'lists',
  },
);

export default (mongoose.models['List'] as Model<IList>) ||
  mongoose.model('List', ListScheme);
