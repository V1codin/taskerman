import dbProvider from '@/db/mongo';

import { TDb } from '@/db/mongo';
import type { ParticularDBType } from '@/db/mongo';
import type { TListNS } from '@/types/db';

export class ListsService {
  private readonly db: TDb;

  constructor(dbProvider: TDb) {
    this.db = dbProvider;
  }

  getListsByBoardId(boardId: string | ParticularDBType) {
    const result = this.db.getListsByBoardId(boardId);

    return result;
  }

  async create(list: TListNS.TCreating): Promise<TListNS.TList> {
    const createdList = await this.db.createList(list);
    const obj = createdList.toJSON();
    const result = {
      ...obj,
      board: String(list.board),
      cards: [],
    };

    return result;
  }
}

export type TListsService = ListsService;

export const listService = new ListsService(dbProvider);
export type ListServiceGetBoardLists = typeof listService.getListsByBoardId;
