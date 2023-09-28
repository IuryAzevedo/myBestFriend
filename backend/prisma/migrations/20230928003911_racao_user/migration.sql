-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "owner_id" TEXT;

-- AlterTable
ALTER TABLE "racao" ADD COLUMN     "owner_id" TEXT;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "racao" ADD CONSTRAINT "racao_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
