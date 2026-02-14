
export interface DoctorDTO  {
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