/*
  Warnings:

  - Added the required column `dataRacao` to the `racao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "racao" ADD COLUMN     "dataRacao" TEXT NOT NULL;
