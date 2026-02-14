import { Router } from "express";
import { createMedicalHistory, getAllMedicalHistories, getMedicalHistoryByPatientId, removeMedicalHistory, updateMedicalHistory } from "./medicalHistory.controller";

const router = Router();

router.get("/", getAllMedicalHistories);
router.get("/patient/:patientId", getMedicalHistoryByPatientId);
router.post("/", createMedicalHistory);
router.put("/patient/:patientId", updateMedicalHistory);
router.delete("/patient/:patientId", removeMedicalHistory);

export default router;
