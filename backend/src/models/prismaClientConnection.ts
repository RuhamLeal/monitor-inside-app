import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "stdout", level: "warn" },
    { emit: "stdout", level: "error" },
  ],
});

export default prisma;