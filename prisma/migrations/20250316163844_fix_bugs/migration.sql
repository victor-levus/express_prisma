/*
  Warnings:

  - You are about to alter the column `discount` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - Added the required column `productName` to the `SaleItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sale` MODIFY `discount` DOUBLE NULL;

-- AlterTable
ALTER TABLE `saleitem` ADD COLUMN `productName` VARCHAR(191) NOT NULL;
