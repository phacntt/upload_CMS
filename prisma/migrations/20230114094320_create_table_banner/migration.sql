/*
  Warnings:

  - You are about to drop the column `merchant` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `commisionPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `wallet` on the `User` table. All the data in the column will be lost.
  - Added the required column `discountAmount` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "merchant",
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "commisionPrice",
ADD COLUMN     "discountAmount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "wallet";

-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "landingPageUrl" TEXT NOT NULL,
    "bannerPosition" TEXT NOT NULL,
    "bannerPage" TEXT NOT NULL,
    "airTimeCreate" TIMESTAMP(3) NOT NULL,
    "airTimeEnd" TIMESTAMP(3) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);
