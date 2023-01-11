/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BannerPage" AS ENUM ('ShopToEarn', 'LearnToEarn', 'DataToEarn', 'WatchToEarn', 'ReadToEarn', 'MissionToEarn');

-- CreateEnum
CREATE TYPE "BannerType" AS ENUM ('HomeBanner', 'TopPickBanner', 'MiddleBanner');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToUser" DROP CONSTRAINT "_CategoryToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToUser" DROP CONSTRAINT "_CategoryToUser_B_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "categoryId";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_CategoryToUser";

-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "bannerPage" "BannerPage" NOT NULL,
    "bannerType" TEXT NOT NULL,
    "bannerPosition" INTEGER NOT NULL,
    "landingPageURL" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);
