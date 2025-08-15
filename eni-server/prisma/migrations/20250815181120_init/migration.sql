/*
  Warnings:

  - The primary key for the `UserWord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Word` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "UserWord" DROP CONSTRAINT "UserWord_wordId_fkey";

-- AlterTable
ALTER TABLE "UserWord" DROP CONSTRAINT "UserWord_pkey",
ALTER COLUMN "wordId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserWord_pkey" PRIMARY KEY ("userId", "wordId");

-- AlterTable
ALTER TABLE "Word" DROP CONSTRAINT "Word_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Word_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Word_id_seq";

-- AddForeignKey
ALTER TABLE "UserWord" ADD CONSTRAINT "UserWord_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
