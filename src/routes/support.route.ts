import express from "express";
import auth from "../middleware/auth.middleware";
import { getDashboardStats } from "../controllers/support.controller";

const router = express.Router();

router.get("/", auth, getDashboardStats);

export default router;
