import { EntityBase } from "@src/core/entities/base.entity";

export interface Nurse extends EntityBase {
    userId: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    license?: string;
    officePhone?: string;
}