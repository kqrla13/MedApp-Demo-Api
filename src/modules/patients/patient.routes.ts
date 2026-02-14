import { Router } from "express";
import { createPatient, getAllPatients, getPatientById, removePatient, updatePatient } from "./patient.controller";

const router = Router();

router.post("/", createPatient);
router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.put("/:id", updatePatient);
router.delete("/:id", removePatient);

export default router; 