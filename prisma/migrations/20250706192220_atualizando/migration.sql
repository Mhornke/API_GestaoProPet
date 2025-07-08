/*
  Warnings:

  - You are about to drop the column `adotanteId` on the `pedidos` table. All the data in the column will be lost.
  - You are about to drop the `interessados` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedidos" DROP COLUMN "adotanteId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "interessados";
