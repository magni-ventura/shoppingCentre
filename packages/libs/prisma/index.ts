import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `prisma` to be reused in dev
  // (so TS doesn’t complain)
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
