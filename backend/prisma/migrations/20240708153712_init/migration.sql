-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImg" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameCard" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "game_url" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "gameCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "gameCard_gameId_key" ON "gameCard"("gameId");

-- AddForeignKey
ALTER TABLE "gameCard" ADD CONSTRAINT "gameCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
