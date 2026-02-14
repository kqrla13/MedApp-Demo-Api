export interface MedicalConsultationDto {
    patientId: number;
    doctorId: number;
    appointmentId: number;
    symptoms: string;
    physicalExam: string;
    diagnosis: string;
    treatment: string;
    recommendations?: string;
    followUp?: string;
    notes?: string;
}
