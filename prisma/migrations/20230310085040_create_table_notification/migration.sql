-- CreateEnum
CREATE TYPE "ActionNotification" AS ENUM ('Reward', 'Notice');

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "action" "ActionNotification" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "image" TEXT,
    "reward" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
