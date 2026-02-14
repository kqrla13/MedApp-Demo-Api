export interface MedicalHistoryDto {
    patientId: number;
    allergies?: string | null;
    medications?: string | null;
    surgeries?: string | null;
    familyHistory?: string | null;
    chronicConditions?: string | null;
    gestationalHistory?: string | null;
    reproductiveHistory?: string | null;
}