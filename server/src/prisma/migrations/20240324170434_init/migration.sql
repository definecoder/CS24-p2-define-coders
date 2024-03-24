/*
  Warnings:

  - You are about to drop the column `roleName` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleName_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roleName",
ADD COLUMN     "roleId" TEXT NOT NULL DEFAULT '299d8911-51c0-4141-b4dd-b0ed98cb9339';

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
