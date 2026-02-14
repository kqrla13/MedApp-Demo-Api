import { MedicalConsultation } from "@prisma/client";
import { prismaClient } from "@src/core/config/database";
import { MedicalConsultationDto } from "./models/medicalConsultation.dto";

export const get = async (): Promise<MedicalConsultation[]> => {
    return prismaClient.medicalConsultation.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            patient: true,
            doctor: true,
            appointment: true,
        }
    });
};

export const getById = async (id: number): Promise<MedicalConsultation | null> => {
    return prismaClient.medicalConsultation.findUnique({
        where: { id },
        include: {
            patient: true,
            doctor: true,
            appointment: true,
        }
    });
};

export const getByPatientId = async (patientId: number): Promise<MedicalConsultation[]> => {
    return prismaClient.medicalConsultation.findMany({
        where: { patientId },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const getByAppointmentId = async (appointmentId: number): Promise<MedicalConsultation | null> => {
    return prismaClient.medicalConsultation.findFirst({
        where: { appointmentId },
    });
};

export const create = async (data: MedicalConsultationDto): Promise<MedicalConsultation> => {
    return prismaClient.medicalConsultation.create({
        data,
    });
};

export const update = async (id: number, data: MedicalConsultationDto): Promise<MedicalConsultation> => {
    return prismaClient.medicalConsultation.update({
        where: { id },
        data,
    });
};

export const remove = async (id: number): Promise<MedicalConsultation> => {
    return prismaClient.medicalConsultation.delete({
        where: { id },
    });
};
