import mongoose from 'mongoose';

import { MongoClient, MongoClientOptions } from 'mongodb';
import { ConnectOptions } from 'mongoose';
import { CURRENT_DB, MONGO_DB_NAME } from '@/utils/constants';

const mongo_uri = process.env['MONGO_DB_URI'];

if (!mongo_uri) {
  throw new Error(
    'Please define the MONGO_DB_URI environment variable inside .env.local',
  );
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function mongoConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
      dbName: MONGO_DB_NAME,
    };

    cached.promise = mongoose.connect(mongo_uri!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

export async function dbConnect() {
  if (CURRENT_DB === 'mongo') {
    return mongoConnect();
  }
  if (CURRENT_DB === 'postgressql') {
    // return prisma.$connect();
    return null;
  }

  return null;
}

const options: MongoClientOptions = {};

let client;
export let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(mongo_uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(mongo_uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
