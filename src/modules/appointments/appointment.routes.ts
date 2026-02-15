import { Router } from "express";
import { createAppointment, getAllAppointments, getAppointmentByDoctorId, getAppointmentById, getAppointmentByPatientId, removeAppointment, updateAppointment } from "./appointment.controller";
import { roleValidator } from "@src/core/middlewares/role-validator.middleware";

const router = Router();

router.post("/", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), createAppointment);
router.get("/", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getAllAppointments);
router.get("/:id", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getAppointmentById);
router.get("/patient/:patientId", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getAppointmentByPatientId);
router.get("/doctor/:doctorId", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getAppointmentByDoctorId);
router.put("/:id", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), updateAppointment);
router.delete("/:id", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), removeAppointment);

export default router;