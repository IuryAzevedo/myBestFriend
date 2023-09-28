-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "racao_id" TEXT,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TiposDePet" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "TiposDePet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "racao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "metodoPagamento" BOOLEAN NOT NULL,
    "parcelas" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "DataCompra" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "racao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TiposDeRacao" (
    "id" TEXT NOT NULL,
    "racao_id" TEXT NOT NULL,

    CONSTRAINT "TiposDeRacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_racao_id_fkey" FOREIGN KEY ("racao_id") REFERENCES "racao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TiposDePet" ADD CONSTRAINT "TiposDePet_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TiposDeRacao" ADD CONSTRAINT "TiposDeRacao_racao_id_fkey" FOREIGN KEY ("racao_id") REFERENCES "racao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
