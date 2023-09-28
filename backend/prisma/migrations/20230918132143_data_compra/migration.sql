/*
  Warnings:

  - You are about to drop the column `DataCompra` on the `racao` table. All the data in the column will be lost.
  - Added the required column `dataCompra` to the `racao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "racao" DROP COLUMN "DataCompra",
ADD COLUMN     "dataCompra" TEXT NOT NULL;
