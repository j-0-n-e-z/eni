/*
  Warnings:

  - You are about to drop the column `subtitleId` on the `UserWord` table. All the data in the column will be lost.
  - Added the required column `fileId` to the `UserWord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timecode` to the `UserWord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserWord" DROP COLUMN "subtitleId",
ADD COLUMN     "fileId" INTEGER NOT NULL,
ADD COLUMN     "timecode" TEXT NOT NULL;
