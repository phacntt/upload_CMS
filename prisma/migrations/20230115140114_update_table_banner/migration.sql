-- CreateEnum
CREATE TYPE "StatusBanner" AS ENUM ('Active', 'Inactive', 'In_Draft');

-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "status" "StatusBanner" NOT NULL DEFAULT 'Inactive';
