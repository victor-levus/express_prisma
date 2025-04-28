/*
  Warnings:

  - You are about to drop the column `description` on the `hub` table. All the data in the column will be lost.
  - Added the required column `fullAddress` to the `Hub` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Hub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hub` DROP COLUMN `description`,
    ADD COLUMN `fullAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;
