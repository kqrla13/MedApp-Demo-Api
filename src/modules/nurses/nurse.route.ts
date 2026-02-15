import { Router } from "express";
import { createNurse, getAllNurses, getNurseByUserId, removeNurse, updateNurse } from "./nurse.controller";
import { roleValidator } from "@src/core/middlewares/role-validator.middleware";

const router = Router();

router.get("/", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getAllNurses);
router.get("/:id", roleValidator(['ADMIN', 'NURSE', 'DOCTOR']), getNurseByUserId);
router.post("/", roleValidator(['ADMIN']), createNurse);
router.put("/:id", roleValidator(['ADMIN']), updateNurse);
router.delete("/:id", roleValidator(['ADMIN']), removeNurse);

export default router;