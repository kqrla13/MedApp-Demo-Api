import { Router } from "express";
import { createVitalSign, getByAppointmentId, removeVitalSign, updateVitalSign } from "./vitalSign.controller";

const router = Router();

router.post("/", createVitalSign);
router.get("/appointment/:id", getByAppointmentId);
router.put("/:id", updateVitalSign);
router.delete("/:id", removeVitalSign);

export default router;