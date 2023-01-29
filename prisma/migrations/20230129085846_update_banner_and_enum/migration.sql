/*
  Warnings:

  - The values [Admin,Guest] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The values [Active,Inactive,In_Draft] on the enum `StatusBanner` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `bannerType` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BannerPage" AS ENUM ('home', 'pop up', 'learn to earn', 'shop to earn', 'play to earn', 'mission to earn', 'read to earn', 'install to earn');

-- CreateEnum
CREATE TYPE "BannerType" AS ENUM ('home banner', 'top pick banner', 'middle banner');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('admin', 'guest');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'guest';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StatusBanner_new" AS ENUM ('active', 'inactive', 'in draft');
ALTER TABLE "Banner" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Banner" ALTER COLUMN "status" TYPE "StatusBanner_new" USING ("status"::text::"StatusBanner_new");
ALTER TYPE "StatusBanner" RENAME TO "StatusBanner_old";
ALTER TYPE "StatusBanner_new" RENAME TO "StatusBanner";
DROP TYPE "StatusBanner_old";
ALTER TABLE "Banner" ALTER COLUMN "status" SET DEFAULT 'inactive';
COMMIT;

-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "bannerType" "BannerType" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'inactive';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'guest';
