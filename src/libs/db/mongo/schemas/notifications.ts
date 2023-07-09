import { Schema, Model } from 'mongoose';

import type { INotification } from './types';

export const NotificationScheme = new Schema<
  INotification,
  Model<INotification>
>(
  {
    type: {
      type: String,
      required: true,
      default: 'info',
    },
    text: { type: String, required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    priority: { type: String, default: 'notification' },
    action: {
      type: String,
      require: true,
    },
    actionData: {
      type: Object,
    },
  },
  {
    timestamps: true,
    collection: 'notifications',
  },
);

NotificationScheme.set('toJSON', {
  virtuals: true,
});
