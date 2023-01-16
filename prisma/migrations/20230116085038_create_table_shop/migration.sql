/*
  Warnings:

  - You are about to drop the column `type` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `nameVN` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "type",
ADD COLUMN     "nameVN" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "logo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "max_com" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
