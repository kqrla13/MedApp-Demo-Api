import { Router } from "express";
import {
    createConsultation,
    getAllConsultations,
    getConsultationByAppointmentId,
    getConsultationById,
    getConsultationsByPatientId,
    removeConsultation,
    updateConsultation
} from "./medicalConsultation.controller";
import { roleValidator } from "@src/core/middlewares/role-validator.middleware";

const router = Router();

router.get("/", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getAllConsultations);
router.get("/:id", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getConsultationById);
router.get("/patient/:patientId", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getConsultationsByPatientId);
router.get("/appointment/:appointmentId", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getConsultationByAppointmentId);
router.post("/", roleValidator(['ADMIN', 'DOCTOR']), createConsultation);
router.put("/:id", roleValidator(['ADMIN', 'DOCTOR']), updateConsultation);
router.delete("/:id", roleValidator(['ADMIN', 'DOCTOR']), removeConsultation);

export default router;
