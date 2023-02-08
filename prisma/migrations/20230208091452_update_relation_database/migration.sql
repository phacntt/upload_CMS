/*
  Warnings:

  - The values [In draft] on the enum `StatusBanner` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `bannerPage` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `categorylv1` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `categorylv2` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - Added the required column `pageId` to the `Banner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'Dev';

-- AlterEnum
BEGIN;
CREATE TYPE "StatusBanner_new" AS ENUM ('Active', 'Inactive');
ALTER TABLE "Banner" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Banner" ALTER COLUMN "status" TYPE "StatusBanner_new" USING ("status"::text::"StatusBanner_new");
ALTER TYPE "StatusBanner" RENAME TO "StatusBanner_old";
ALTER TYPE "StatusBanner_new" RENAME TO "StatusBanner";
DROP TYPE "StatusBanner_old";
ALTER TABLE "Banner" ALTER COLUMN "status" SET DEFAULT 'Inactive';
COMMIT;

-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "bannerPage",
ADD COLUMN     "pageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "pageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "categorylv1",
DROP COLUMN "categorylv2",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "pageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshToken";

-- DropEnum
DROP TYPE "BannerPage";

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banner" ADD CONSTRAINT "Banner_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
