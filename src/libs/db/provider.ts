import postgres from '@/db/postgres/api/prisma';

export const dbProvider = postgres as TDb;
