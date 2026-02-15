import { Router } from "express";
import { createVitalSign, getByAppointmentId, removeVitalSign, updateVitalSign } from "./vitalSign.controller";
import { roleValidator } from "@src/core/middlewares/role-validator.middleware";

const router = Router();

router.post("/", roleValidator(['ADMIN', 'NURSE']), createVitalSign);
router.get("/appointment/:id", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getByAppointmentId);
router.put("/:id", roleValidator(['ADMIN', 'NURSE']), updateVitalSign);
router.delete("/:id", roleValidator(['ADMIN', 'NURSE']), removeVitalSign);

export default router;