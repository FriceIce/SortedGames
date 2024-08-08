/*
  Warnings:

  - You are about to drop the column `game_url` on the `gameCard` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `gameCard` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `gameCard` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `gameCard` table. All the data in the column will be lost.
  - You are about to drop the column `short_description` on the `gameCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gameCard" DROP COLUMN "game_url",
DROP COLUMN "genre",
DROP COLUMN "platform",
DROP COLUMN "publisher",
DROP COLUMN "short_description";
