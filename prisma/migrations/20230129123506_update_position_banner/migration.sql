/*
  Warnings:

  - Changed the type of `bannerPosition` on the `Banner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "bannerPosition",
ADD COLUMN     "bannerPosition" INTEGER NOT NULL;
