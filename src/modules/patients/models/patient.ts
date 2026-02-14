import { EntityBase } from "@src/core/entities/base.entity";

export interface Patient extends EntityBase {
    name: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    phone: string;
    email: string;
    address: string;
}