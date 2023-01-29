/*
  Warnings:

  - The values [home,pop up,learn to earn,shop to earn,play to earn,mission to earn,read to earn,install to earn] on the enum `BannerPage` will be removed. If these variants are still used in the database, this will fail.
  - The values [home banner,top pick banner,middle banner] on the enum `BannerType` will be removed. If these variants are still used in the database, this will fail.
  - The values [admin,guest] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The values [active,inactive,in draft] on the enum `StatusBanner` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `bannerPage` on the `Banner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BannerPage_new" AS ENUM ('Home', 'Pop Up', 'Learn To Earn', 'Shop To Earn', 'Play To Earn', 'Mission To Earn', 'Read To Earn', 'Install To Earn');
ALTER TABLE "Banner" ALTER COLUMN "bannerPage" TYPE "BannerPage_new" USING ("bannerPage"::text::"BannerPage_new");
ALTER TYPE "BannerPage" RENAME TO "BannerPage_old";
ALTER TYPE "BannerPage_new" RENAME TO "BannerPage";
DROP TYPE "BannerPage_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "BannerType_new" AS ENUM ('Home Banner', 'Top Pick Banner', 'Middle Banner');
ALTER TABLE "Banner" ALTER COLUMN "bannerType" TYPE "BannerType_new" USING ("bannerType"::text::"BannerType_new");
ALTER TYPE "BannerType" RENAME TO "BannerType_old";
ALTER TYPE "BannerType_new" RENAME TO "BannerType";
DROP TYPE "BannerType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('Admin', 'Guest');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'Guest';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StatusBanner_new" AS ENUM ('Active', 'Inactive', 'In Draft');
ALTER TABLE "Banner" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Banner" ALTER COLUMN "status" TYPE "StatusBanner_new" USING ("status"::text::"StatusBanner_new");
ALTER TYPE "StatusBanner" RENAME TO "StatusBanner_old";
ALTER TYPE "StatusBanner_new" RENAME TO "StatusBanner";
DROP TYPE "StatusBanner_old";
ALTER TABLE "Banner" ALTER COLUMN "status" SET DEFAULT 'Inactive';
COMMIT;

-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "bannerPage",
ADD COLUMN     "bannerPage" "BannerPage" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Inactive';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'Guest';
