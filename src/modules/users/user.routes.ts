import Router from "express";
import { getAllUsers, login } from "./user.controller";
import tokenValidatorMiddleware from "@src/core/middlewares/token-validator.middleware";

const router = Router();

router.get("/", tokenValidatorMiddleware, getAllUsers);
router.post("/login", login);

export default router;
