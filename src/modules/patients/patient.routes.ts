import { Router } from "express";
import { createPatient, getAllPatients, getPatientById, removePatient, updatePatient } from "./patient.controller";
import { roleValidator } from "@src/core/middlewares/role-validator.middleware";

const router = Router();

router.post("/", roleValidator(['ADMIN', 'NURSE']), createPatient);
router.get("/", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getAllPatients);
router.get("/:id", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getPatientById);
router.put("/:id", roleValidator(['ADMIN', 'NURSE']), updatePatient);
router.delete("/:id", roleValidator(['ADMIN', 'NURSE']), removePatient);

export default router;