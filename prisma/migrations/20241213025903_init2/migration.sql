-- CreateTable
CREATE TABLE `Caixa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dia` INTEGER NOT NULL,
    `mes` ENUM('Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro') NOT NULL,
    `ano` INTEGER NOT NULL,
    `tipo` ENUM('Entrada', 'Saida') NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `origem` VARCHAR(35) NOT NULL,
    `descricao` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
