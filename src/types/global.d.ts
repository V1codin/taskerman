import mongoose from 'mongoose';

declare global {
  var _mongoClientPromise: Promise<any> | undefined;

  interface IMongoose {
    conn: null | Awaited<Promise<typeof mongoose>>;
    promise: null | Promise<typeof mongoose>;
  }

  var _mongoose: IMongoose;
}
