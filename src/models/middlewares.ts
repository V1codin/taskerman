import mongoose, { Model, Types } from 'mongoose';

import { BoardScheme, IBoard } from './boards';
import { IUser, UserScheme } from './users';
import { IList, ListScheme } from './lists';
import { CardScheme, ICard } from './cards';
import { IPassword, PasswordScheme } from './passwords';
import { ISession, SessionScheme } from './sessions';

// UserScheme.pre('updateOne', function () {
//   console.log(this);
// });

BoardScheme.pre('deleteOne', {}, async function (next) {
  const filter = this.getFilter();
  if (filter['_id']) {
    const boardIdObj = new Types.ObjectId(filter['_id']);
    // ? remove the board ref from owner
    await UserModel.updateOne(
      {
        subs: boardIdObj,
      },
      { $pull: { subs: boardIdObj } },
    );

    // ? remove the board ref from members
    const board = await BoardModel.findOne({
      _id: boardIdObj,
    });

    if (board?.members.length) {
      for (let i = 0; i < board.members.length; i++) {
        const memberObj = board.members[i];

        await UserModel.updateOne(
          {
            _id: memberObj,
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

export const ListModel =
  (mongoose.models['List'] as Model<IList>) ||
  mongoose.model('List', ListScheme);

export const CardModel =
  (mongoose.models['Card'] as Model<ICard>) ||
  mongoose.model('Card', CardScheme);

export const PasswordModel =
  (mongoose.models['Password'] as Model<IPassword>) ||
  mongoose.model('Password', PasswordScheme);

export const SessionModel =
  (mongoose.models['Session'] as Model<ISession>) ||
  mongoose.model('Session', SessionScheme);
