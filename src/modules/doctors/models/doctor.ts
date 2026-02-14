import { EntityBase } from "@src/core/entities/base.entity";

export interface Doctor extends EntityBase {
    userId: number;
    name: string;
    lastName: string;
    email: string;
    licenseNumber: string;
    specialty: string;
    subSpecialty?: string;
    phone: string;
    officePhone?: string;
}
