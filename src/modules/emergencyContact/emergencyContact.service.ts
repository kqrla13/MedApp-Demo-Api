import { prismaClient } from "@src/core/config/database";
import { EmergencyContact } from "./models/emergencyContact";
import { EmergencyContactDto } from "./models/emergencyContact.dto";

export const getByPatientId = async (patientId: number): Promise<EmergencyContact[]> => {
    return prismaClient.emergencyContact.findMany({
        where: {
            patientId: patientId
        },
        orderBy: {
            id: 'desc',
        }
    });
}

export const create = async (data: EmergencyContactDto): Promise<EmergencyContact> => {
    return prismaClient.emergencyContact.create({
        data,
    });
}

export const update = async (id: number, data: EmergencyContactDto): Promise<EmergencyContact> => {
    return prismaClient.emergencyContact.update({
        where: {
            id,
        },
        data,
    });
}

export const remove = async (id: number): Promise<EmergencyContact> => {
    return prismaClient.emergencyContact.delete({
        where: {
            id,
        },
    });
}