/*
  Warnings:

  - You are about to drop the column `codigo_foto` on the `fotos` table. All the data in the column will be lost.
  - Added the required column `codigoFoto` to the `fotos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fotos" DROP COLUMN "codigo_foto",
ADD COLUMN     "codigoFoto" TEXT NOT NULL;
