import { PrismaClient } from '@prisma/client/extension';
import { prismaLogger } from './logger';

declare global {
  var _db: PrismaClient | undefined;
}

if (!global._db) {
  global._db = new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event",
        level: "info",
      },
      {
        emit: "event",
        level: "warn",
      },
      {
        emit: "event",
        level: "error",
      },
    ],
  });
}

const dbWithEvents = global._db as PrismaClient & {
  $on: (event: string, listener: (event: any) => void) => void;
};

dbWithEvents.$on("query", (e: any) => {
  prismaLogger.info(e);
});

dbWithEvents.$on("info", (e: any) => {
  prismaLogger.info(e);
});

dbWithEvents.$on("warn", (e: any) => {
  prismaLogger.warn(e);
});

dbWithEvents.$on("error", (e: any) => {
  prismaLogger.error(e);
});

const db: PrismaClient = global._db;

export default db;