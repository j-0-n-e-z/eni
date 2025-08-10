-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isEmailConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailConfirmationLink" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "userId" TEXT NOT NULL,
    "refreshToken" TEXT,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailConfirmationLink_key" ON "User"("emailConfirmationLink");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
