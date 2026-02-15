import { Router } from "express";
import { createMedicalHistory, getAllMedicalHistories, getMedicalHistoryByPatientId, removeMedicalHistory, updateMedicalHistory } from "./medicalHistory.controller";
import { roleValidator } from "@src/core/middlewares/role-validator.middleware";

const router = Router();

router.get("/", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getAllMedicalHistories);
router.get("/patient/:patientId", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getMedicalHistoryByPatientId);
router.post("/", roleValidator(['ADMIN', 'DOCTOR']), createMedicalHistory);
router.put("/patient/:patientId", roleValidator(['ADMIN', 'DOCTOR']), updateMedicalHistory);
router.delete("/patient/:patientId", roleValidator(['ADMIN', 'DOCTOR']), removeMedicalHistory);

export default router;
