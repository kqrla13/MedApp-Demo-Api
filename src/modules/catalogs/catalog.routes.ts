import { Router } from "express";
import { getSpecialties, getDoctors } from "./catalog.controller";

const router = Router();

router.get("/specialties", getSpecialties);
router.get("/doctors", getDoctors);

export default router;
