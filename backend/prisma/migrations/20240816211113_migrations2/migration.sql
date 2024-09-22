/*
  Warnings:

  - A unique constraint covering the columns `[id_pub]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_pub` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `id_pub` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateIndex
CREATE UNIQUE INDEX `post_id_pub_key` ON `post`(`id_pub`);
