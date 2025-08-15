/*
  Warnings:

  - You are about to drop the column `timecode` on the `UserWord` table. All the data in the column will be lost.
  - Added the required column `page` to the `UserWord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitleIndex` to the `UserWord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitleTimecode` to the `UserWord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserWord" DROP COLUMN "timecode",
ADD COLUMN     "page" INTEGER NOT NULL,
ADD COLUMN     "subtitleIndex" INTEGER NOT NULL,
ADD COLUMN     "subtitleTimecode" TEXT NOT NULL;
