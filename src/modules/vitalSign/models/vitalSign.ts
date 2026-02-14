import { EntityBase } from "@src/core/entities/base.entity";

export interface VitalSign extends EntityBase {
    temperature: number;
    heartRate: number;
    bloodPressure: string;
    oxygenSaturation: number;
    respiratoryRate: number;
    weight: number;
    height: number;
}