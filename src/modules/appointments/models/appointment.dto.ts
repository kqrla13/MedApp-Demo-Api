import { AppointmentSpecialty, AppointmentStatus } from "@prisma/client";

export interface AppointmentDto {
    date: Date;
    time: string;
    reason: string;
    status: AppointmentStatus;
    patientId: number;
    doctorId: number;
    specialty: AppointmentSpecialty;
}
