/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[campaignId]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campaignId` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productId" TEXT NOT NULL,
ALTER COLUMN "discountRate" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "discountAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "discount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "campaignId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_campaignId_key" ON "Shop"("campaignId");
