import mongoose from 'mongoose';
import Users from './schemas/users';
import Boards, { IBoard } from './schemas/boards';

import { IUser } from './schemas/users';
import { ENCRYPT_CONFIG } from '@/utils/constants';
import { EncryptService } from '@/libs/encrypt.service';
import { MONGO_DB_NAME, MONGO_DB_CONNECT_OPTIONS } from '@/utils/constants';

import { AuthService } from '@/libs/auth.service';
import {
  TMongoConnectOptions,
  IDbCollections,
  TBoardDataClient,
  OmitedSafeUser,
} from '../../../types/db';

if (!process.env['MONGO_DB_URI']) {
  throw new Error(
    'Please define the MONGO_DB_URI environment variable inside .env.local',
  );
}

type TMongoosePromise = Promise<typeof mongoose> | null;
type TMongooseConnection = typeof mongoose | null;

export class MongoDataBaseProvider {
  private promise: TMongoosePromise;
  private mongooseConnect: TMongooseConnection;

  readonly encrypter: EncryptService;

  constructor() {
    this.encrypter = new EncryptService(ENCRYPT_CONFIG);
  }

  get mongoose() {
    return this.mongooseConnect;
  }

  set mongoose(newMongoose: TMongooseConnection) {
    this.mongooseConnect = newMongoose;
  }

  get mongoosePromise() {
    return this.promise;
  }

  set mongoosePromise(newMongoose: TMongoosePromise) {
    this.promise = newMongoose;
  }

  async init(config: TMongoConnectOptions) {
    try {
      await this.connect(config);

      console.log('Connected to db');
    } catch (e: unknown) {
      console.log('init error', e);
    }

    return this;
  }

  private async connect({ uri }: TMongoConnectOptions) {
    if (!this.mongoosePromise) {
      const opts: mongoose.ConnectOptions = {
        bufferCommands: false,
        dbName: MONGO_DB_NAME,
      };

      this.mongoosePromise = mongoose.connect(uri, opts);
    }

    try {
      this.mongoose = await this.promise;
    } catch (e) {
      this.mongoosePromise = null;
      throw e;
    }

    return this.mongoose;
  }

  private async getSafeBoardData(board: IBoard) {
    const ownerBoardUser = await this.getUserById(board.ownerId);

    const owner = !ownerBoardUser
      ? null
      : await this.getSafeUser(ownerBoardUser);

    const members: OmitedSafeUser[] = [];
    const pendingMembers: OmitedSafeUser[] = [];

    for (let i = 0; i < board.memberIds.length; i++) {
      const memberId = board.memberIds[i];
      if (!memberId) continue;

      const member = await this.getUserById(
        new mongoose.Types.ObjectId(memberId),
      );

      if (!member) continue;
      const safeMemberData = await this.getSafeUser(member);
      members.push(safeMemberData);
    }

    for (let i = 0; i < board.pendingMemberIds.length; i++) {
      const pendingMemberId = board.pendingMemberIds[i];
      if (!pendingMemberId) continue;

      const pendingMember = await this.getUserById(
        new mongoose.Types.ObjectId(pendingMemberId),
      );
      if (!pendingMember) continue;
      const safePendingMemberData = await this.getSafeUser(pendingMember);
      pendingMembers.push(safePendingMemberData);
    }

    const result: TBoardDataClient = {
      bg: board.bg,
      members,
      owner,
      pendingMembers,
      title: board.title,
    };

    return result;
  }

  private async getSubscribedBoardsData(userSubs: mongoose.Types.ObjectId[]) {
    const subs: TBoardDataClient[] = [];

    for (let i = 0; i < userSubs.length; i++) {
      const item = userSubs[i];
      if (!item) continue;

      const board = await this.getBoardById(item);
      if (!board) continue;

      const safeBoard = await this.getSafeBoardData(board);
      subs.push(safeBoard);
    }

    return subs;
  }

  getCollection<T extends keyof IDbCollections>(collection: T) {
    return this.mongoose?.model<IDbCollections[T]>(collection);
  }

  getUserByUserName(username: string) {
    const user = Users.findOne({
      username,
    });

    return user;
  }

  getUserById(userId: mongoose.Types.ObjectId) {
    const result = Users.findOne({
      _id: userId,
    });

    return result;
  }

  getBoardById(boerdId: mongoose.Types.ObjectId) {
    const result = Boards.findOne({
      _id: boerdId,
    });

    return result;
  }

  async getSafeUser(user: IUser, isSubsIncluded: boolean = false) {
    let subs: TBoardDataClient[] = [];

    if (isSubsIncluded) {
      subs = await this.getSubscribedBoardsData(user.subs);
    }
    const result: OmitedSafeUser = {
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      imageURL: user.imageURL,
      subs,
    };

    return result;
  }

  /*
  create(user: TUserLogin): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  */
}

export type TDb = MongoDataBaseProvider;
const provider = new MongoDataBaseProvider();

const db = await provider.init(MONGO_DB_CONNECT_OPTIONS);
export const auth = new AuthService(db);

export default db;
