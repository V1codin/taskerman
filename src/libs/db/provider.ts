import mongo from '@/db/mongo/api/mongo';
import postgres from '@/db/postgres/api/prisma';

import { CURRENT_DB } from '@/utils/constants';

export const dbProvider = (CURRENT_DB !== 'mongo' ? postgres : mongo) as TDb;
