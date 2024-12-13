/*
  Warnings:

  - You are about to drop the `suprimento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `suprimento` DROP FOREIGN KEY `Suprimento_categoriaId_fkey`;

-- DropTable
DROP TABLE `suprimento`;

-- CreateTable
CREATE TABLE `suprimentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` INTEGER NOT NULL,
    `nome` VARCHAR(50) NOT NULL,
    `estoque` INTEGER NOT NULL,
    `marca` VARCHAR(15) NULL,
    `estq_min` DOUBLE NOT NULL,
    `descricao` TEXT NULL,
    `unidade` ENUM('Un', 'Kg', 'g', 'Pc') NOT NULL DEFAULT 'Un',
    `categoriaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `suprimentos` ADD CONSTRAINT `suprimentos_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
