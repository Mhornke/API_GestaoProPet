/*
  Warnings:

  - You are about to drop the column `interessadoId` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `tipoPessoa` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `interessados` table. All the data in the column will be lost.
  - You are about to drop the column `dataNascimento` on the `interessados` table. All the data in the column will be lost.
  - You are about to drop the column `estadoCivil` on the `interessados` table. All the data in the column will be lost.
  - You are about to drop the column `isAtivo` on the `interessados` table. All the data in the column will be lost.
  - You are about to drop the column `jaAdotouConosco` on the `interessados` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `interessados` table. All the data in the column will be lost.
  - You are about to drop the column `observacoes` on the `interessados` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `interessados` table. All the data in the column will be lost.
  - You are about to drop the `fotointeressados` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `animalId` to the `interessados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `interessados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `interessados` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_interessadoId_fkey";

-- DropForeignKey
ALTER TABLE "fotointeressados" DROP CONSTRAINT "fotointeressados_interessadoId_fkey";

-- DropIndex
DROP INDEX "interessados_cpf_key";

-- AlterTable
ALTER TABLE "Endereco" DROP COLUMN "interessadoId",
DROP COLUMN "tipoPessoa";

-- AlterTable
ALTER TABLE "interessados" DROP COLUMN "cpf",
DROP COLUMN "dataNascimento",
DROP COLUMN "estadoCivil",
DROP COLUMN "isAtivo",
DROP COLUMN "jaAdotouConosco",
DROP COLUMN "nome",
DROP COLUMN "observacoes",
DROP COLUMN "telefone",
ADD COLUMN     "animalId" INTEGER NOT NULL,
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "resposta" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "fotointeressados";
