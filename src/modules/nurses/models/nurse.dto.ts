export interface NurseDto {
    userId: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    license?: string;
    officePhone?: string;
}