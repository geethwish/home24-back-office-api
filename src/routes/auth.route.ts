import express, { Request, Response } from "express";
import { login, signup } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

export default router;
