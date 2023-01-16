/*
  Warnings:

  - Added the required column `action_point` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commission_policy` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cookie_policy` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introduction` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other_notice` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rejected_reason` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traffic_building_policy` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "action_point" TEXT NOT NULL,
ADD COLUMN     "commission_policy" TEXT NOT NULL,
ADD COLUMN     "cookie_policy" TEXT NOT NULL,
ADD COLUMN     "introduction" TEXT NOT NULL,
ADD COLUMN     "other_notice" TEXT NOT NULL,
ADD COLUMN     "rejected_reason" TEXT NOT NULL,
ADD COLUMN     "traffic_building_policy" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
