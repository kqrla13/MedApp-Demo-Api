import { EntityBase } from "@src/core/entities/base.entity";

export interface MedicalHistory extends EntityBase {
    id: number;
    patientId: number;
    allergies?: string | null;
    medications?: string | null;
    surgeries?: string | null;
    familyHistory?: string | null;
    chronicConditions?: string | null;
    gestationalHistory?: string | null;
    reproductiveHistory?: string | null;
}