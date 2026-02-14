import { Doctor } from "@prisma/client";
import { prismaClient } from "@src/core/config/database";
import { DoctorDTO } from "./models/doctor.dto";

export const get = async (): Promise<Doctor[]> => {
    return prismaClient.doctor.findMany({
        where: {
            isActive: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const getById = async (id: number): Promise<Doctor | null> => {
    return prismaClient.doctor.findUnique({
        where: {
            id,
            isActive: true,
        },
    });
};

export const create = async (data: DoctorDTO): Promise<Doctor> => {
    return prismaClient.doctor.create({
        data,
    });
};

export const update = async (id: number, data: Doctor): Promise<Doctor> => {
    return prismaClient.doctor.update({
        where: {
            id,
        },
        data,
    });
};

export const remove = async (id: number): Promise<Doctor> => {
    return prismaClient.doctor.update({
        where: {
            id,
        },
        data: {
            isActive: false,
        },
    });
};
