-- CreateTable
CREATE TABLE `especies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `animais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `isAtivo` BOOLEAN NOT NULL DEFAULT true,
    `peso` DECIMAL(4, 1) NULL,
    `porte` ENUM('PP', 'P', 'M', 'G', 'GG') NOT NULL DEFAULT 'M',
    `nascimentoApx` DATETIME(3) NULL,
    `castracao` ENUM('Verificar', 'Nao', 'Pelo_Abrigo', 'Ja_Veio_Castrado') NOT NULL DEFAULT 'Verificar',
    `castracaoApx` DATETIME(3) NULL,
    `status` ENUM('Disponive_Para_Adocao', 'Adotado', 'Lar_Temporario', 'Verificar') NOT NULL DEFAULT 'Verificar',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `especieId` INTEGER NULL,
    `sexo` ENUM('Macho', 'Femea', 'Verificar', 'Nao_Identificado') NOT NULL DEFAULT 'Nao_Identificado',
    `observacoes` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fotoanimais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(30) NOT NULL,
    `codigoFoto` TEXT NOT NULL,
    `animalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fotouncionarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(30) NOT NULL,
    `codigoFoto` LONGTEXT NOT NULL,
    `funcionarioId` VARCHAR(60) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcionario` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(60) NOT NULL,
    `cpf` VARCHAR(11) NULL,
    `telefone` VARCHAR(11) NOT NULL DEFAULT '99999999999',
    `estadoCivil` ENUM('Nao_Informado', 'Casado', 'Solteiro', 'Divorciado', 'Viuvo') NOT NULL DEFAULT 'Nao_Informado',
    `dataNascimento` DATETIME(3) NULL,
    `email` VARCHAR(60) NULL,
    `acessaSistema` BOOLEAN NOT NULL DEFAULT false,
    `observacoes` VARCHAR(400) NULL,
    `senha` VARCHAR(60) NULL,

    UNIQUE INDEX `Funcionario_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fotointeressados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(30) NOT NULL,
    `codigoFoto` TEXT NOT NULL,
    `interessadoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interessados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `cpf` VARCHAR(11) NULL,
    `telefone` VARCHAR(11) NOT NULL DEFAULT '99999999999',
    `isAtivo` BOOLEAN NOT NULL DEFAULT true,
    `estadoCivil` ENUM('Nao_Informado', 'Casado', 'Solteiro', 'Divorciado', 'Viuvo') NOT NULL DEFAULT 'Nao_Informado',
    `dataNascimento` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `jaAdotouConosco` BOOLEAN NOT NULL DEFAULT false,
    `observacoes` VARCHAR(400) NULL,

    UNIQUE INDEX `interessados_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(60) NULL,
    `cidade` VARCHAR(60) NOT NULL,
    `bairro` VARCHAR(60) NULL,
    `estado` VARCHAR(60) NOT NULL,
    `logradouro` VARCHAR(60) NOT NULL,
    `numero` VARCHAR(60) NOT NULL,
    `complemento` VARCHAR(60) NULL,
    `referencia` VARCHAR(60) NULL,
    `interessadoId` INTEGER NULL,
    `tipoPessoa` ENUM('Interessado', 'Funcionario') NOT NULL,
    `funcionarioId` VARCHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `animais` ADD CONSTRAINT `animais_especieId_fkey` FOREIGN KEY (`especieId`) REFERENCES `especies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fotoanimais` ADD CONSTRAINT `fotoanimais_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `animais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fotouncionarios` ADD CONSTRAINT `fotouncionarios_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `Funcionario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fotointeressados` ADD CONSTRAINT `fotointeressados_interessadoId_fkey` FOREIGN KEY (`interessadoId`) REFERENCES `interessados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_interessadoId_fkey` FOREIGN KEY (`interessadoId`) REFERENCES `interessados`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `Funcionario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
