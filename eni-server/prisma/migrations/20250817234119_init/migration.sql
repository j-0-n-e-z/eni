/*
  Warnings:

  - You are about to drop the column `subtitleIndex` on the `UserWord` table. All the data in the column will be lost.
  - Added the required column `subtitleWordIndex` to the `UserWord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserWord" DROP COLUMN "subtitleIndex",
ADD COLUMN     "subtitleWordIndex" INTEGER NOT NULL;
