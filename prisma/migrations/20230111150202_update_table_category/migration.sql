/*
  Warnings:

  - You are about to drop the column `linkMerchant` on the `Product` table. All the data in the column will be lost.
  - Added the required column `merchant` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkProduct` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchant` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "merchant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "linkMerchant",
ADD COLUMN     "linkProduct" TEXT NOT NULL,
ADD COLUMN     "merchant" TEXT NOT NULL;
