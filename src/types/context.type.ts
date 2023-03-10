import {  HOST, NODE_ENV } from "../config";
import { PrismaClient } from "@prisma/client";

const host = NODE_ENV === 'development' ? 'localhost' : HOST
const port = NODE_ENV === 'development' ? '5432' : '5437'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://uploadCMS:123456@${host}:${port}/uploadCMS_DB?schema=public`,
    },
  },
});

export interface Context {
  prisma: PrismaClient;
}

export const context: Context = {
  prisma: prisma,
};
