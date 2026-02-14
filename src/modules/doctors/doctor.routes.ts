import Router from "express";
import { createDoctor, getAllDoctors, getDoctorByUserId, updateDoctor } from "./doctor.controller";

const router = Router();

router.get("/", getAllDoctors);
router.get("/:id", getDoctorByUserId);
router.post("/", createDoctor);
router.put("/:id", updateDoctor);

export default router;
