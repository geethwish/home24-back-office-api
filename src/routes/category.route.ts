import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers/category.controller";
import auth from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", auth, getAllCategories);
router.post("/", auth, createCategory);
router.get("/:id", auth, getCategoryById);

export default router;
