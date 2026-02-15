import Router from "express";
import { getAllUsers, login, createUser } from "./user.controller";
import tokenValidatorMiddleware from "@src/core/middlewares/token-validator.middleware";

const router = Router();

router.get("/", tokenValidatorMiddleware, getAllUsers);
router.post("/", createUser);
router.post("/login", login);

export default router;
