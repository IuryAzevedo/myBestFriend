/*
  Warnings:

  - Changed the type of `dataRacao` on the `racao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "racao" DROP COLUMN "dataRacao",
ADD COLUMN     "dataRacao" TIMESTAMP(3) NOT NULL;
