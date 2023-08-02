/*
  Warnings:

  - You are about to drop the column `originalLink` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `periodEndTime` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `periodStartTime` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "originalLink",
DROP COLUMN "periodEndTime",
DROP COLUMN "periodStartTime";
