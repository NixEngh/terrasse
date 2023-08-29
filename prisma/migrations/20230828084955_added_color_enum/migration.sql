/*
  Warnings:

  - The `profileColor` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProfileColor" AS ENUM ('red', 'green', 'yellow', 'blue');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileColor",
ADD COLUMN     "profileColor" "ProfileColor" NOT NULL DEFAULT 'blue';
