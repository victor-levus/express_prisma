/*
  Warnings:

  - Added the required column `paymentType` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sale` ADD COLUMN `comment` VARCHAR(191) NULL,
    ADD COLUMN `discount` VARCHAR(191) NULL,
    ADD COLUMN `paymentType` ENUM('CASH', 'CARD', 'TRANSFER', 'CASHCARD', 'CASHTRANSFER', 'CARDTRANSFER', 'CASHCARDTRANSFER') NOT NULL;
