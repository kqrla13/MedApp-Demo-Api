/*
  Warnings:

  - A unique constraint covering the columns `[patientId]` on the table `MedicalHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MedicalHistory_patientId_key" ON "MedicalHistory"("patientId");
