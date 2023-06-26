import dbProvider from '@/db/mongo';

import type { TDb } from '@/db/mongo';
import type { TNotificationNS } from '@/types/db';

class NotificationService {
  private readonly db: TDb;
  constructor(dbProvider: TDb) {
    this.db = dbProvider;
  }

  create(note: TNotificationNS.TCreating): Promise<boolean> {
    return this.db.createNotification(note);
  }

  getNotificationsByUserId(userId: string) {
    return this.db.getSafeNotificationsByUserId(userId);
  }

  getNotificationById(id: string) {
    return this.db.getSafeNotificationById(id);
  }

  delete(id: string) {
    return this.db.deleteNotification(id);
  }
}

export type TNotificationService = NotificationService;

export const notificationService = new NotificationService(dbProvider);
