import tokenValidatorMiddleware from "@src/core/middlewares/token-validator.middleware";
import { Router } from "express";
import { createNurse, getAllNurses, getNurseByUserId, removeNurse, updateNurse } from "./nurse.controller";

const router = Router();

router.get("/", getAllNurses);
router.get("/:id", getNurseByUserId);
router.post("/", createNurse);
router.put("/:id", updateNurse);
router.delete("/:id", removeNurse);

export default router;