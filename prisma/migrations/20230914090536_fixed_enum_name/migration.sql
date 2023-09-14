/*
  Warnings:

  - The values [profileGreed] on the enum `ProfileColor` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProfileColor_new" AS ENUM ('profileRed', 'profileGreen', 'profileYellow', 'profileBlue');
ALTER TABLE "User" ALTER COLUMN "profileColor" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "profileColor" TYPE "ProfileColor_new" USING ("profileColor"::text::"ProfileColor_new");
ALTER TYPE "ProfileColor" RENAME TO "ProfileColor_old";
ALTER TYPE "ProfileColor_new" RENAME TO "ProfileColor";
DROP TYPE "ProfileColor_old";
ALTER TABLE "User" ALTER COLUMN "profileColor" SET DEFAULT 'profileBlue';
COMMIT;
