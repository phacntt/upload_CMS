/*
  Warnings:

  - You are about to drop the column `appExistRate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `appNewRate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `periodEndTime` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `periodStartTime` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productLink` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sales` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `shopName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `webExistRate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `webNewRate` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "appExistRate",
DROP COLUMN "appNewRate",
DROP COLUMN "periodEndTime",
DROP COLUMN "periodStartTime",
DROP COLUMN "productLink",
DROP COLUMN "sales",
DROP COLUMN "shopName",
DROP COLUMN "webExistRate",
DROP COLUMN "webNewRate",
ADD COLUMN     "country" TEXT;
