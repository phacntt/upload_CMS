/*
  Warnings:

  - You are about to drop the column `nameVN` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discountAmount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discountRate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `linkAffilitate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `linkProduct` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `merchant` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `action_point` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `campaignId` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `commission_policy` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `cookie_policy` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `introduction` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `max_com` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `other_notice` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `rejected_reason` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `traffic_building_policy` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Shop` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[itemId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shopId]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appExistRate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appNewRate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commission` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commissionRate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerLink` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodEndTime` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodStartTime` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productLink` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `webExistRate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `webNewRate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commissionRate` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerLink` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalLink` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodEndTime` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodStartTime` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopName` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_productId_key";

-- DropIndex
DROP INDEX "Shop_campaignId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "nameVN",
ADD COLUMN     "keywords" TEXT[];

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createAt",
DROP COLUMN "description",
DROP COLUMN "discount",
DROP COLUMN "discountAmount",
DROP COLUMN "discountRate",
DROP COLUMN "image",
DROP COLUMN "linkAffilitate",
DROP COLUMN "linkProduct",
DROP COLUMN "merchant",
DROP COLUMN "name",
DROP COLUMN "productId",
DROP COLUMN "updateAt",
ADD COLUMN     "appExistRate" TEXT NOT NULL,
ADD COLUMN     "appNewRate" TEXT NOT NULL,
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "commission" TEXT NOT NULL,
ADD COLUMN     "commissionRate" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "itemId" INTEGER NOT NULL,
ADD COLUMN     "offerLink" TEXT NOT NULL,
ADD COLUMN     "periodEndTime" TEXT NOT NULL,
ADD COLUMN     "periodStartTime" TEXT NOT NULL,
ADD COLUMN     "productLink" TEXT NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "sales" INTEGER NOT NULL,
ADD COLUMN     "shopName" TEXT NOT NULL,
ADD COLUMN     "webExistRate" TEXT NOT NULL,
ADD COLUMN     "webNewRate" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "action_point",
DROP COLUMN "campaignId",
DROP COLUMN "commission_policy",
DROP COLUMN "cookie_policy",
DROP COLUMN "createAt",
DROP COLUMN "introduction",
DROP COLUMN "logo",
DROP COLUMN "max_com",
DROP COLUMN "name",
DROP COLUMN "other_notice",
DROP COLUMN "rejected_reason",
DROP COLUMN "traffic_building_policy",
DROP COLUMN "updateAt",
DROP COLUMN "url",
ADD COLUMN     "commissionRate" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "offerLink" TEXT NOT NULL,
ADD COLUMN     "originalLink" TEXT NOT NULL,
ADD COLUMN     "periodEndTime" TEXT NOT NULL,
ADD COLUMN     "periodStartTime" TEXT NOT NULL,
ADD COLUMN     "shopId" INTEGER NOT NULL,
ADD COLUMN     "shopName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_itemId_key" ON "Product"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_shopId_key" ON "Shop"("shopId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
