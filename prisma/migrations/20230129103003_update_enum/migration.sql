/*
  Warnings:

  - The values [Pop Up,Learn To Earn,Shop To Earn,Play To Earn,Mission To Earn,Read To Earn,Install To Earn] on the enum `BannerPage` will be removed. If these variants are still used in the database, this will fail.
  - The values [Home Banner,Top Pick Banner,Middle Banner] on the enum `BannerType` will be removed. If these variants are still used in the database, this will fail.
  - The values [In Draft] on the enum `StatusBanner` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BannerPage_new" AS ENUM ('Home', 'Pop up', 'Learn to earn', 'Shop to earn', 'Play to earn', 'Mission to earn', 'Read to earn', 'Install to earn');
ALTER TABLE "Banner" ALTER COLUMN "bannerPage" TYPE "BannerPage_new" USING ("bannerPage"::text::"BannerPage_new");
ALTER TYPE "BannerPage" RENAME TO "BannerPage_old";
ALTER TYPE "BannerPage_new" RENAME TO "BannerPage";
DROP TYPE "BannerPage_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "BannerType_new" AS ENUM ('Home banner', 'Top pick banner', 'Middle banner');
ALTER TABLE "Banner" ALTER COLUMN "bannerType" TYPE "BannerType_new" USING ("bannerType"::text::"BannerType_new");
ALTER TYPE "BannerType" RENAME TO "BannerType_old";
ALTER TYPE "BannerType_new" RENAME TO "BannerType";
DROP TYPE "BannerType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StatusBanner_new" AS ENUM ('Active', 'Inactive', 'In draft');
ALTER TABLE "Banner" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Banner" ALTER COLUMN "status" TYPE "StatusBanner_new" USING ("status"::text::"StatusBanner_new");
ALTER TYPE "StatusBanner" RENAME TO "StatusBanner_old";
ALTER TYPE "StatusBanner_new" RENAME TO "StatusBanner";
DROP TYPE "StatusBanner_old";
ALTER TABLE "Banner" ALTER COLUMN "status" SET DEFAULT 'Inactive';
COMMIT;
