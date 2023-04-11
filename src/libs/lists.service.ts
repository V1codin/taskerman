import dbProvider from '@/db/mongo';

import { TDb } from '@/db/mongo';
import { TListNS } from '@/types/db';
import type { ParticularDBType } from '@/db/mongo';

export class ListsService {
  private readonly db: TDb;

  constructor(dbProvider: TDb) {
    this.db = dbProvider;
  }

  getListsByBoardId(boardId: string | ParticularDBType) {
    const result = this.db.getListsByBoardId(boardId);

    return result;
  }

  async create(list: TListNS.TCreatingList): Promise<TListNS.TList> {
    const createdList = await this.db.createList(list);

    const result = {
      _id: String(createdList._id),
      title: createdList.title,
      boardId: String(createdList.boardId),
      cards: [],
    };

    return result;
  }
}

export type TListsService = ListsService;

export const listService = new ListsService(dbProvider);
// export type TCreatedList = Awaited<ReturnType<typeof listService.create>>;
