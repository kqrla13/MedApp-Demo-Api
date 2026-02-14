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

const router = Router();

router.get("/", getAllConsultations);
router.get("/:id", getConsultationById);
router.get("/patient/:patientId", getConsultationsByPatientId);
router.get("/appointment/:appointmentId", getConsultationByAppointmentId);
router.post("/", createConsultation);
router.put("/:id", updateConsultation);
router.delete("/:id", removeConsultation);

export default router;
