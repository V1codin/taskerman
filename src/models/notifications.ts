import { Schema, Model } from 'mongoose';
import { IUser } from './users';

export type TNotificationActionData = {};

export interface INotification {
  text: string;
  recipient: IUser;
  type: string;
  action: string;
  actionData: TNotificationActionData;
}

export const NotificationScheme = new Schema<
  INotification,
  Model<INotification>
>(
  {
    text: { type: String, required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, default: 'info' },
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
