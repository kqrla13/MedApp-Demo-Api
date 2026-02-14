import { Router } from "express";
import { createAppointment, getAllAppointments, getAppointmentByDoctorId, getAppointmentById, getAppointmentByPatientId, removeAppointment, updateAppointment } from "./appointment.controller";

const router = Router();

router.post("/", createAppointment);
router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.get("/patient/:patientId", getAppointmentByPatientId);
router.get("/doctor/:doctorId", getAppointmentByDoctorId);
router.put("/:id", updateAppointment);
router.delete("/:id", removeAppointment);

export default router;