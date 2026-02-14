import { Nurse } from "@prisma/client";
import { prismaClient } from "@src/core/config/database";
import { NurseDto } from "./models/nurse.dto";

export const get = async (): Promise<Nurse[]> => {
    return prismaClient.nurse.findMany({
        where: {
            isActive: true
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const getById = async (id: number): Promise<Nurse | null> => {
    return prismaClient.nurse.findUnique({
        where: {
            id,
            isActive: true
        },
    });
};

export const create = async (data: NurseDto): Promise<Nurse> => {
    return prismaClient.nurse.create({
        data,
    });
};

export const update = async (id: number, data: NurseDto): Promise<Nurse> => {
    return prismaClient.nurse.update({
        where: {
            id,
        },
        data,
    });
};

export const remove = async (id: number): Promise<Nurse> => {
    return prismaClient.nurse.update({
        where: {
            id,
        },
        data: {
            isActive: false,
        },
    });
};

