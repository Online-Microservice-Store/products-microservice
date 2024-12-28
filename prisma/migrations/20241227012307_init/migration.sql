/*
  Warnings:

  - You are about to drop the column `dicount` on the `Product` table. All the data in the column will be lost.
  - Added the required column `discount` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Catalog" ALTER COLUMN "productsAmount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "dicount",
ADD COLUMN     "discount" INTEGER NOT NULL;
