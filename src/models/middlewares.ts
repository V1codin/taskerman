import mongoose, { Model, Types } from 'mongoose';

import { BoardScheme } from './boards';
import { UserScheme } from './users';
import { PasswordScheme } from './passwords';
import { SessionScheme } from './sessions';
import { NotificationScheme } from './notifications';

import type { IBoard } from './boards';
import type { IUser } from './users';
import type { IPassword } from './passwords';
import type { ISession } from './sessions';
import type { INotification } from './notifications';
import type { TUserNS } from '@/types/db';

UserScheme.pre('updateOne', async function (next) {
  const update = this.getUpdate() as ReturnType<typeof this.getUpdate> &
    TUserNS.TUpdating;

  if (update && update.displayName) {
    const doc = await this.model.findOne(this.getQuery());
    if (doc) {
      const email = doc?.email ? ` ${doc?.email}` : '';

      this.set('nameAlias', update.displayName + email);
    }
  }

  next();
});

BoardScheme.pre('save', async function (next) {
  this.members.push({
    user: this.owner,
    role: 'owner',
    isPending: false,
  });
  return next();
});

// @ts-ignore
BoardScheme.pre('deleteOne', {}, async function (next) {
  // @ts-ignore
  const filter = this.getFilter();

  // @ts-ignore
  const doc = await this.model.findOne(this.getQuery()).populate('members');

  if (doc) {
    const boardIdObj = new Types.ObjectId(doc._id);

    if (doc?.members.length) {
      for (let i = 0; i < doc.members.length; i++) {
        const memberObj = doc.members[i];

        await UserModel.updateOne(
          {
            _id: memberObj.user,
          },
          { $pull: { subs: boardIdObj } },
        );
      }
    }
  }

  next();
});

export const BoardModel =
  (mongoose.models['Board'] as Model<IBoard>) ||
  mongoose.model('Board', BoardScheme);

export const UserModel =
  (mongoose.models['User'] as Model<IUser>) ||
  mongoose.model('User', UserScheme);

export const PasswordModel =
  (mongoose.models['Password'] as Model<IPassword>) ||
  mongoose.model('Password', PasswordScheme);

export const SessionModel =
  (mongoose.models['Session'] as Model<ISession>) ||
  mongoose.model('Session', SessionScheme);

export const NotificationModel =
  (mongoose.models['Notification'] as Model<INotification>) ||
  mongoose.model('Notification', NotificationScheme);
