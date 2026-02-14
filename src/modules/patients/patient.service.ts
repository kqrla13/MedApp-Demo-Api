import { Patient } from "@prisma/client";
import { prismaClient } from "@src/core/config/database";
import { PatientDto } from "./models/patient.dto";

export const get = async (): Promise<Patient[]> => {
    return prismaClient.patient.findMany({
        where: {
            isActive: true
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const getById = async (id: number): Promise<Patient | null> => {
    return prismaClient.patient.findUnique({
        where: {
            id,
            isActive: true
        },
    });
};

export const create = async (data: PatientDto): Promise<Patient> => {
    return prismaClient.patient.create({
        data: {
            ...data,
            birthDate: new Date(data.birthDate),
        },
    });
};

export const update = async (id: number, data: PatientDto): Promise<Patient> => {
    return prismaClient.patient.update({
        where: {
            id,
        },
        data: {
            ...data,
            birthDate: new Date(data.birthDate),
        },
    });
};

export const remove = async (id: number): Promise<Patient> => {
    return prismaClient.patient.update({
        where: {
            id,
        },
        data: {
            isActive: false,
        },
    });
};
