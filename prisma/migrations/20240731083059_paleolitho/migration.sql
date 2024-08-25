/*
  Warnings:

  - Added the required column `category` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stages` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "locality" TEXT NOT NULL,
ADD COLUMN     "period" TEXT NOT NULL,
ADD COLUMN     "stages" TEXT NOT NULL;
