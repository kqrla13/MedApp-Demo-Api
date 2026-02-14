import { Router } from "express";
import { createEmergencyContact, getByPatientIdController, removeEmergencyContact, updateEmergencyContact } from "./emergencyContact.controller";

const router = Router();

router.get("/:patientId", getByPatientIdController);
router.post("/", createEmergencyContact);
router.put("/:id", updateEmergencyContact);
router.delete("/:id", removeEmergencyContact);

export default router;

