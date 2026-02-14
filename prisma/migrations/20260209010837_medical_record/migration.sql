/*
  Warnings:

  - Added the required column `specialty` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AppointmentSpecialty" AS ENUM ('GENERAL', 'PEDIATRIC', 'SURGICAL', 'DENTAL', 'PSYCHOLOGICAL', 'GYNECOLOGICAL', 'OBSTETRIC', 'CARDIOLOGY', 'PULMONARY', 'NEUROLOGY', 'RHEUMATOLOGY', 'ONCOLOGY', 'DERMATOLOGY', 'GASTROENTEROLOGY', 'UROLOGY', 'NUTRITION');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "specialty" "AppointmentSpecialty" NOT NULL;

-- CreateTable
CREATE TABLE "MedicalHistory" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "allergies" TEXT,
    "medications" TEXT,
    "surgeries" TEXT,
    "familyHistory" TEXT,
    "chronicConditions" TEXT,
    "gestationalHistory" TEXT,
    "reproductiveHistory" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalConsultation" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "symptoms" TEXT NOT NULL,
    "physicalExam" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "recommendations" TEXT,
    "followUp" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalConsultation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicalHistory" ADD CONSTRAINT "MedicalHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalConsultation" ADD CONSTRAINT "MedicalConsultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalConsultation" ADD CONSTRAINT "MedicalConsultation_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalConsultation" ADD CONSTRAINT "MedicalConsultation_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
