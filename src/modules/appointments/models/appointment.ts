import { AppointmentSpecialty, AppointmentStatus } from "@prisma/client";
import { EntityBase } from "@src/core/entities/base.entity";

export interface Appointment extends EntityBase {
    date: Date;
    time: string;
    reason: string;
    status: AppointmentStatus;
    patientId: number;
    doctorId: number;
    specialty: AppointmentSpecialty;
}