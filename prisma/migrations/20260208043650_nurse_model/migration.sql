/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Nurse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Nurse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nurse" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "officePhone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Nurse_email_key" ON "Nurse"("email");
