import { prismaClient } from "@src/core/config/database";
import { Appointment } from "./models/appointment";
import { AppointmentDto } from "./models/appointment.dto";

export const getAll = async (): Promise<Appointment[]> => {
    return await prismaClient.appointment.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            patient: true,
            doctor: true,
        },
    });
};

export const getById = async (id: number): Promise<Appointment | null> => {
    return await prismaClient.appointment.findUnique({
        where: {
            id,
        },
        include: {
            patient: true,
            doctor: true,
        },
    });
};

export const getByPatientId = async (patientId: number): Promise<Appointment[]> => {
    return await prismaClient.appointment.findMany({
        where: {
            patientId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            patient: true,
            doctor: true,
        },
    });
};

export const getByDoctorId = async (doctorId: number): Promise<Appointment[]> => {
    return await prismaClient.appointment.findMany({
        where: {
            doctorId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            patient: true,
            doctor: true,
        },
    });
};

export const create = async (data: AppointmentDto): Promise<Appointment> => {
    return await prismaClient.appointment.create({
        data: {
            ...data,
            date: new Date(data.date),
        },
    });
};

export const update = async (id: number, data: AppointmentDto): Promise<Appointment> => {
    return await prismaClient.appointment.update({
        where: {
            id,
        },
        data: {
            ...data,
            date: data.date ? new Date(data.date) : undefined,
        },
    });
};

export const remove = async (id: number): Promise<Appointment> => {
    return await prismaClient.appointment.delete({
        where: {
            id,
        },
    });
};
