import { prismaClient } from "@src/core/config/database";
import { AppointmentSpecialty } from "@prisma/client";

export const fetchSpecialties = async () => {
    // Map the enum values to an array of objects with id and name
    return Object.values(AppointmentSpecialty).map((specialty) => ({
        id: specialty,
        name: specialty.charAt(0) + specialty.slice(1).toLowerCase().replace(/_/g, " "),
    }));
};

export const fetchDoctors = async () => {
    return prismaClient.doctor.findMany({
        where: {
            isActive: true,
        },
        select: {
            id: true,
            name: true,
            lastName: true,
        },
        orderBy: {
            name: "asc",
        },
    });
};
