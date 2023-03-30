import Users from '@/models/users';
import Boards from '@/models/boards';

import { Types } from 'mongoose';

export class MongoDataBaseProvider {
  constructor() {}

  getUserByUserName(username: string) {
    const user = Users.findOne({
      username,
    });

    return user;
  }

  getUserById(userId: string | Types.ObjectId) {
    const result = Users.findOne({
      _id: typeof userId === 'string' ? new Types.ObjectId(userId) : userId,
    });

    return result;
  }

  getUserIdByUserName(username: string) {
    const result = Users.findOne({
      username,
    });

    return result;
  }

  getBoardById(boerdId: string | Types.ObjectId) {
    const result = Boards.findOne({
      _id: typeof boerdId === 'string' ? new Types.ObjectId(boerdId) : boerdId,
    });

    return result;
  }

  getUserBoards(userId: string | Types.ObjectId) {
    const _id =
      typeof userId === 'string' ? new Types.ObjectId(userId) : userId;

    const boards = Boards.find({
      ownerId: _id,
    });

    return boards;
  }
}

export type TDb = MongoDataBaseProvider;
const mongoProvider = new MongoDataBaseProvider();

export default mongoProvider;
