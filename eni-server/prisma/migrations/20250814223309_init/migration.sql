/*
  Warnings:

  - The primary key for the `Word` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Word` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[text]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_userId_fkey";

-- AlterTable
ALTER TABLE "Word" DROP CONSTRAINT "Word_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Word_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "UserWord" (
    "userId" TEXT NOT NULL,
    "wordId" INTEGER NOT NULL,
    "subtitleId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "isLearned" BOOLEAN NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,

    CONSTRAINT "UserWord_pkey" PRIMARY KEY ("userId","wordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWord_userId_wordId_key" ON "UserWord"("userId", "wordId");

-- CreateIndex
CREATE UNIQUE INDEX "Word_text_key" ON "Word"("text");

-- AddForeignKey
ALTER TABLE "UserWord" ADD CONSTRAINT "UserWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWord" ADD CONSTRAINT "UserWord_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
