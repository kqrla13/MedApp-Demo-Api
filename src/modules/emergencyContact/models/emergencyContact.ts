import { EntityBase } from "@src/core/entities/base.entity";

export interface EmergencyContact extends EntityBase {
    name: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    patientId: number;
}   