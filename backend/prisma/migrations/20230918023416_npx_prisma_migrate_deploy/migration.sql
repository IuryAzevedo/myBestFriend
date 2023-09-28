/*
  Warnings:

  - You are about to drop the `TiposDePet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TiposDeRacao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `raca` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TiposDePet" DROP CONSTRAINT "TiposDePet_pet_id_fkey";

-- DropForeignKey
ALTER TABLE "TiposDeRacao" DROP CONSTRAINT "TiposDeRacao_racao_id_fkey";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "raca" TEXT NOT NULL,
ADD COLUMN     "tipo" TEXT NOT NULL;

-- DropTable
DROP TABLE "TiposDePet";

-- DropTable
DROP TABLE "TiposDeRacao";
