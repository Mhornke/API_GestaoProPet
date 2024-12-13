-- CreateEnum
CREATE TYPE "EstadoCivil" AS ENUM ('Solteiro', 'Casado', 'Uniao_Estavel', 'Divorciado', 'Viuvo');

-- CreateEnum
CREATE TYPE "Generos" AS ENUM ('Macho', 'Femea');

-- CreateEnum
CREATE TYPE "Portes" AS ENUM ('PP', 'P', 'M', 'G', 'GG');

-- CreateEnum
CREATE TYPE "Especies" AS ENUM ('Cachorro', 'Gato');

-- CreateEnum
CREATE TYPE "StatusAnimal" AS ENUM ('Disponivel_para_Adocao', 'Adotado', 'Em_Cuidados', 'Inativo');

-- CreateEnum
CREATE TYPE "Castrado" AS ENUM ('Nao', 'Pelo_Abrigo', 'Ja_Veio_Castrado');

-- CreateEnum
CREATE TYPE "Unidades" AS ENUM ('Un', 'Kg', 'g', 'Pc');

-- CreateEnum
CREATE TYPE "TipoLancamentos" AS ENUM ('Entrada', 'Saida');

-- CreateEnum
CREATE TYPE "Meses" AS ENUM ('Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');

-- CreateTable
CREATE TABLE "funcionarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "funcaoPrincipalId" INTEGER NOT NULL,

    CONSTRAINT "funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funcoes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(20) NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "funcoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adotantes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "jaNosAdotou" VARCHAR(5) NOT NULL,

    CONSTRAINT "adotantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" SERIAL NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "estado" VARCHAR(15) NOT NULL,
    "cidade" VARCHAR(30) NOT NULL,
    "bairro" VARCHAR(20) NOT NULL,
    "endereco" VARCHAR(40) NOT NULL,
    "numero" VARCHAR(10) NOT NULL,
    "complemento" VARCHAR(10) NOT NULL,
    "referencia" VARCHAR(40) NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animais" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "nascimento_aproximado" DATE NOT NULL,
    "genero" "Generos" NOT NULL,
    "especie" "Especies" NOT NULL,
    "peso" DECIMAL(4,1) NOT NULL,
    "porte" "Portes" NOT NULL,
    "castrado" "Castrado" NOT NULL DEFAULT 'Nao',

    CONSTRAINT "animais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(30) NOT NULL,
    "codigo_foto" TEXT NOT NULL,
    "animalId" INTEGER,

    CONSTRAINT "fotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suprimento" (
    "id" SERIAL NOT NULL,
    "item" VARCHAR(30) NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "estoque" DECIMAL(8,3) NOT NULL DEFAULT 0,
    "unidade" "Unidades" NOT NULL DEFAULT 'Un',

    CONSTRAINT "Suprimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(15) NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lancamentos" (
    "id" SERIAL NOT NULL,
    "dia" SMALLINT NOT NULL,
    "mes" VARCHAR(15) NOT NULL,
    "ano" INTEGER NOT NULL,
    "tipo" "TipoLancamentos" NOT NULL,
    "descricao" VARCHAR(40) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "origem" VARCHAR(15) NOT NULL,

    CONSTRAINT "lancamentos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "funcionarios" ADD CONSTRAINT "funcionarios_funcaoPrincipalId_fkey" FOREIGN KEY ("funcaoPrincipalId") REFERENCES "funcoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotos" ADD CONSTRAINT "fotos_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suprimento" ADD CONSTRAINT "Suprimento_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
