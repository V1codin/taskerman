import { Schema, Model } from 'mongoose';
import { IUser } from './users';

export type TNotificationActionData = {
  boardId: string;
};
export type TNotePriority = 'conflict' | 'warning' | 'notification';
export type TActions = 'board_invite';
export type TNoteTypes = 'option' | 'info';

export const notePriorityEnum = [
  'conflict',
  'warning',
  'notification',
] as const;
export const noteActionsEnum = ['board_invite'] as const;
export const noteTypesEnum = ['option', 'info'] as const;

export interface INotification {
  _id: string;
  type: TNoteTypes;
  text: string;
  recipient: IUser;
  priority: TNotePriority;
  action: TActions;
  actionData: TNotificationActionData;
}

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
