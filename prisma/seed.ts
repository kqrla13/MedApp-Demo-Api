import { PrismaClient, Role, Gender, AppointmentStatus, AppointmentSpecialty } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("123456", 10);

  console.log("Seeding Users, Doctors and Nurses...");

  // --- DOCTORS ---
  const doctorsData = [
    { email: "karla@test.com", name: "Karla", lastName: "Doe", license: "DOC-KARLA-001", specialty: "General Medicine" },
    { email: "samuel@test.com", name: "Samuel", lastName: "Smith", license: "DOC-SAMUEL-002", specialty: "Pediatrics" },
    { email: "elena@test.com", name: "Elena", lastName: "Gomez", license: "DOC-ELENA-003", specialty: "Cardiology" },
  ];

  const doctors: any[] = [];
  for (const doc of doctorsData) {
    const user = await prisma.user.upsert({
      where: { email: doc.email },
      update: {},
      create: {
        email: doc.email,
        password: password,
        role: Role.DOCTOR,
      },
    });

    const doctor = await prisma.doctor.upsert({
      where: { email: doc.email },
      update: {},
      create: {
        userId: user.id,
        name: doc.name,
        lastName: doc.lastName,
        email: doc.email,
        licenseNumber: doc.license,
        specialty: doc.specialty,
        phone: "555-010" + (doctors.length + 1),
      },
    });
    doctors.push(doctor);
  }

  // --- NURSES ---
  const nursesData = [
    { email: "nurse1@test.com", name: "Alice", lastName: "Johnson" },
    { email: "nurse2@test.com", name: "Bob", lastName: "Brown" },
    { email: "nurse3@test.com", name: "Charlie", lastName: "Davis" },
  ];

  for (const nur of nursesData) {
    const user = await prisma.user.upsert({
      where: { email: nur.email },
      update: {},
      create: {
        email: nur.email,
        password: password,
        role: Role.NURSE,
      },
    });

    await prisma.nurse.upsert({
      where: { email: nur.email },
      update: {},
      create: {
        userId: user.id,
        name: nur.name,
        lastName: nur.lastName,
        email: nur.email,
        phone: "555-020" + (nursesData.indexOf(nur) + 1),
      },
    });
  }

  // --- PATIENTS ---
  console.log("Seeding Patients, Emergency Contacts and Medical Histories...");
  const patientsData = [
    { email: "john@patient.com", name: "John", lastName: "Smith", birthDate: new Date("1985-05-15"), gender: Gender.MALE },
    { email: "jane@patient.com", name: "Jane", lastName: "Doe", birthDate: new Date("1992-08-22"), gender: Gender.FEMALE },
    { email: "alex@patient.com", name: "Alex", lastName: "Wilson", birthDate: new Date("1978-12-10"), gender: Gender.OTHER },
  ];

  const patients = [];
  for (const pat of patientsData) {
    const patient = await prisma.patient.upsert({
      where: { email: pat.email },
      update: {},
      create: {
        name: pat.name,
        lastName: pat.lastName,
        email: pat.email,
        birthDate: pat.birthDate,
        gender: pat.gender,
        phone: "555-030" + (patientsData.indexOf(pat) + 1),
        address: pat.name + " Street, #123",
      },
    });
    patients.push(patient);

    // Emergency Contact
    await prisma.emergencyContact.upsert({
      where: { email: `emergency-${pat.email}` },
      update: {},
      create: {
        name: "Emergency " + pat.name,
        lastName: pat.lastName,
        email: `emergency-${pat.email}`,
        phone: "911-000" + (patientsData.indexOf(pat) + 1),
        address: "Emergency Rd 456",
        patientId: patient.id,
      },
    });

    // Medical History
    await prisma.medicalHistory.upsert({
      where: { patientId: patient.id },
      update: {},
      create: {
        patientId: patient.id,
        allergies: "None",
        medications: "None",
        surgeries: "None",
        familyHistory: "No major occurrences",
        chronicConditions: "None",
      },
    });
  }

  // --- APPOINTMENTS, VITAL SIGNS, CONSULTATIONS ---
  console.log("Seeding Appointments and Consultations...");
  for (let i = 0; i < 3; i++) {
    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(),
        time: "10:00 AM",
        reason: "Regular Checkup",
        status: AppointmentStatus.COMPLETED,
        patientId: patients[i].id,
        doctorId: doctors[i].id,
        specialty: AppointmentSpecialty.GENERAL,
      },
    });

    await prisma.vitalSign.create({
      data: {
        appointmentId: appointment.id,
        patientId: patients[i].id,
        temperature: 36.5,
        heartRate: 72,
        bloodPressure: "120/80",
        oxygenSaturation: 98,
        respiratoryRate: 16,
        weight: 70 + i * 5,
        height: 170 + i * 2,
      },
    });

    await prisma.medicalConsultation.create({
      data: {
        appointmentId: appointment.id,
        patientId: patients[i].id,
        doctorId: doctors[i].id,
        symptoms: "Fatigue",
        physicalExam: "Normal",
        diagnosis: "Mild stress",
        treatment: "Rest",
      },
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
