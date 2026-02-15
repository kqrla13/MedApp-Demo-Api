import Router from "express";
import { createDoctor, getAllDoctors, getDoctorByUserId, updateDoctor } from "./doctor.controller";
import { roleValidator } from "@src/core/middlewares/role-validator.middleware";

const router = Router();

router.get("/", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getAllDoctors);
router.get("/:id", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getDoctorByUserId);
router.post("/", roleValidator(['ADMIN']), createDoctor);
router.put("/:id", roleValidator(['ADMIN']), updateDoctor);

export default router;
