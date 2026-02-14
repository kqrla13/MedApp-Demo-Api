import { MedicalHistory } from "@prisma/client";
import { prismaClient } from "@src/core/config/database";
import { MedicalHistoryDto } from "./models/medicalHistory.dto";

export const get = async (): Promise<MedicalHistory[]> => {
    return prismaClient.medicalHistory.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const getByPatientId = async (patientId: number): Promise<MedicalHistory | null> => {
    return prismaClient.medicalHistory.findUnique({
        where: {
            patientId,
        },
    });
};

export const create = async (data: MedicalHistoryDto): Promise<MedicalHistory> => {
    return prismaClient.medicalHistory.create({
        data,
    });
};

export const updateByPatientId = async (patientId: number, data: MedicalHistoryDto): Promise<MedicalHistory> => {
    return prismaClient.medicalHistory.update({
        where: {
            patientId,
        },
        data,
    });
};

export const remove = async (patientId: number): Promise<MedicalHistory> => {
    return prismaClient.medicalHistory.delete({
        where: {
            patientId,
        },
    });
};
