-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pets` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `idade` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `raca` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `racao_id` VARCHAR(191) NULL,
    `owner_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `racao` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `quantidade` DOUBLE NOT NULL,
    `dataRacao` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `owner_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_racao_id_fkey` FOREIGN KEY (`racao_id`) REFERENCES `racao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `racao` ADD CONSTRAINT `racao_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
