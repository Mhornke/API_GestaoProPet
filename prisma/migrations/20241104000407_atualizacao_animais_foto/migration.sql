/*
  Warnings:

  - Added the required column `foto` to the `animais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "animais" ADD COLUMN     "foto" TEXT NOT NULL;
