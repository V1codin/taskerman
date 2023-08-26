import { TRecordNS } from '@/types/db';
import { dbProvider } from './db/provider';

class RecordService {
  private readonly db: TDb;

  constructor(dbProvider: TDb) {
    this.db = dbProvider;
  }

  getRecordsOfBoard(boardId: string) {
    return this.db.getRecordsOfBoard(boardId);
  }

  create(record: TRecordNS.TCreating) {
    return this.db.createRecord(record);
  }
}

export const recordService = new RecordService(dbProvider);
