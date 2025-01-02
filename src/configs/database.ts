import { PrismaClient } from '@prisma/client';

import { prismaLogger } from './logger';

declare global {
  // eslint-disable-next-line no-unused-vars
  var globalDatabase: PrismaClient | undefined;
}

if (!global.globalDatabase) {
  global.globalDatabase = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'info',
      },
      {
        emit: 'event',
        level: 'warn',
      },
      {
        emit: 'event',
        level: 'error',
      },
    ],
  });
}

const databaseWithEvents = global.globalDatabase as PrismaClient & {
  $on: (event: string, listener: (event: any) => void) => void;
};

databaseWithEvents.$on('query', (event: any) => {
  prismaLogger.info(event);
});

databaseWithEvents.$on('info', (event: any) => {
  prismaLogger.info(event);
});

databaseWithEvents.$on('warn', (event: any) => {
  prismaLogger.warn(event);
});

databaseWithEvents.$on('error', (event: any) => {
  prismaLogger.error(event);
});

export const database: PrismaClient = global.globalDatabase;
