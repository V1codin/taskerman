import mongoose, { Model, Types } from 'mongoose';

import { BoardScheme, IBoard } from './boards';
import { IUser, UserScheme } from './users';
import { IPassword, PasswordScheme } from './passwords';
import { ISession, SessionScheme } from './sessions';
import { TUserNS } from '@/types/db';

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
