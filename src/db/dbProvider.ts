import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env['MONGO_DB_URI']) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

type DbConnectOptions = {
  uri: string;
  options?: MongoClientOptions;
};

class MongoDataBaseProvider {
  private dbClient: MongoClient;
  public clientPromise: Promise<MongoClient>;

  get client() {
    return this.dbClient;
  }

  set client(newClient: MongoClient) {
    this.dbClient = newClient;
  }

  async connect({ uri, options }: DbConnectOptions) {
    if (process.env.NODE_ENV === 'development') {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
      };

      if (!globalWithMongo._mongoClientPromise) {
        this.client = new MongoClient(uri);
        globalWithMongo._mongoClientPromise = this.client.connect();
      }
      this.clientPromise = globalWithMongo._mongoClientPromise;
    } else {
      // In production mode, it's best to not use a global variable.
      this.client = new MongoClient(uri, options);
      this.clientPromise = this.client.connect();
    }

    return this.clientPromise;
  }
}

export const dbProvider = new MongoDataBaseProvider();
