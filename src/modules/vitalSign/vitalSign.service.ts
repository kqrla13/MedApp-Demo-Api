import { prismaClient } from "@src/core/config/database";
import { VitalSignDto } from "./models/vitalSign.dto";

export const create = async (data: VitalSignDto) => {
    return prismaClient.vitalSign.create({
        data,
    });
};

export const getVitalSignByAppointmentId = async (id: number): Promise<VitalSignDto[]> => {
    return prismaClient.vitalSign.findMany({
        where: {
            appointmentId: id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const update = async (id: number, data: VitalSignDto) => {
    return prismaClient.vitalSign.update({
        where: {
            id,
        },
        data,
    });
};

export const remove = async (id: number) => {
    return prismaClient.vitalSign.delete({
        where: {
            id,
        },
    });
};
