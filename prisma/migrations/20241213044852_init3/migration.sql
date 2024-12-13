-- CreateTable
CREATE TABLE `Suprimento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item` VARCHAR(30) NOT NULL,
    `categoriaId` INTEGER NOT NULL,
    `estoque` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(15) NOT NULL,
    `descricao` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Suprimento` ADD CONSTRAINT `Suprimento_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
