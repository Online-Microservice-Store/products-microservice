/*
  Warnings:

  - Added the required column `color` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "color" TEXT NOT NULL;
