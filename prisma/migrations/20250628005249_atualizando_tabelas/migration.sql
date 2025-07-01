-- CreateEnum
CREATE TYPE "Sexos" AS ENUM ('Macho', 'Femea');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Disponivel', 'Adotado');

-- CreateEnum
CREATE TYPE "EstadoCivil" AS ENUM ('Nao_Informado', 'Casado', 'Solteiro', 'Divorciado', 'Viuvo');

-- CreateEnum
CREATE TYPE "TipoPessoa" AS ENUM ('Interessado', 'Funcionario');

-- CreateEnum
CREATE TYPE "Porte" AS ENUM ('PP', 'P', 'M', 'G', 'GG');

-- CreateEnum
CREATE TYPE "TipoMovimentacao" AS ENUM ('Entrada', 'Saida');

-- CreateEnum
CREATE TYPE "Mes" AS ENUM ('Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');

-- CreateEnum
CREATE TYPE "Unidades" AS ENUM ('Un', 'Kg', 'g', 'Pc');

-- CreateTable
CREATE TABLE "especies" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,

    CONSTRAINT "especies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animais" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER,
    "sexo" "Sexos" NOT NULL,
    "castrado" BOOLEAN NOT NULL DEFAULT false,
    "destaque" BOOLEAN NOT NULL DEFAULT true,
    "foto" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "porte" "Porte" NOT NULL DEFAULT 'P',
    "especieId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Disponivel',

    CONSTRAINT "animais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "adotanteId" TEXT NOT NULL,
    "animalId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "resposta" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotoanimais" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(30) NOT NULL,
    "codigoFoto" TEXT NOT NULL,
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "fotoanimais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotouncionarios" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(30) NOT NULL,
    "codigoFoto" TEXT NOT NULL,
    "funcionarioId" VARCHAR(60) NOT NULL,

    CONSTRAINT "fotouncionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "cpf" VARCHAR(11),
    "telefone" VARCHAR(11) NOT NULL DEFAULT '99999999999',
    "estadoCivil" "EstadoCivil" NOT NULL DEFAULT 'Nao_Informado',
    "dataNascimento" TIMESTAMP(3),
    "email" VARCHAR(60),
    "acessaSistema" BOOLEAN NOT NULL DEFAULT false,
    "observacoes" VARCHAR(400),
    "senha" VARCHAR(60),

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotointeressados" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(30) NOT NULL,
    "codigoFoto" TEXT NOT NULL,
    "interessadoId" INTEGER NOT NULL,

    CONSTRAINT "fotointeressados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interessados" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "cpf" VARCHAR(11),
    "telefone" VARCHAR(11) NOT NULL DEFAULT '99999999999',
    "isAtivo" BOOLEAN NOT NULL DEFAULT true,
    "estadoCivil" "EstadoCivil" NOT NULL DEFAULT 'Nao_Informado',
    "dataNascimento" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jaAdotouConosco" BOOLEAN NOT NULL DEFAULT false,
    "observacoes" VARCHAR(400),

    CONSTRAINT "interessados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" SERIAL NOT NULL,
    "cep" VARCHAR(60),
    "cidade" VARCHAR(60) NOT NULL,
    "bairro" VARCHAR(60),
    "estado" VARCHAR(60) NOT NULL,
    "logradouro" VARCHAR(60) NOT NULL,
    "numero" VARCHAR(60) NOT NULL,
    "complemento" VARCHAR(60),
    "referencia" VARCHAR(60),
    "interessadoId" INTEGER,
    "tipoPessoa" "TipoPessoa" NOT NULL,
    "funcionarioId" VARCHAR(36),

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Caixa" (
    "id" SERIAL NOT NULL,
    "dia" INTEGER NOT NULL,
    "mes" "Mes" NOT NULL,
    "ano" INTEGER NOT NULL,
    "tipo" "TipoMovimentacao" NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "origem" VARCHAR(35) NOT NULL,
    "descricao" VARCHAR(35) NOT NULL,

    CONSTRAINT "Caixa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suprimentos" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "estoque" INTEGER NOT NULL,
    "marca" VARCHAR(15),
    "estq_min" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT,
    "unidade" "Unidades" NOT NULL DEFAULT 'Un',
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "suprimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(15) NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_cpf_key" ON "Funcionario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "interessados_cpf_key" ON "interessados"("cpf");

-- AddForeignKey
ALTER TABLE "animais" ADD CONSTRAINT "animais_especieId_fkey" FOREIGN KEY ("especieId") REFERENCES "especies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotoanimais" ADD CONSTRAINT "fotoanimais_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotouncionarios" ADD CONSTRAINT "fotouncionarios_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotointeressados" ADD CONSTRAINT "fotointeressados_interessadoId_fkey" FOREIGN KEY ("interessadoId") REFERENCES "interessados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_interessadoId_fkey" FOREIGN KEY ("interessadoId") REFERENCES "interessados"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suprimentos" ADD CONSTRAINT "suprimentos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
