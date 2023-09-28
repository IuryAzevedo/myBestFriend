/*
  Warnings:

  - You are about to drop the column `metodoPagamento` on the `racao` table. All the data in the column will be lost.
  - You are about to drop the column `parcelas` on the `racao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "racao" DROP COLUMN "metodoPagamento",
DROP COLUMN "parcelas";
