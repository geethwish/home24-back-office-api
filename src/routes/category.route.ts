import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoriesByParent,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller";
import auth from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", auth, getAllCategories);
router.get("/categoryMenu", auth, getCategoriesByParent);
router.get("/:id", auth, getCategoryById);
router.post("/", auth, createCategory);
router.patch("/:id", auth, updateCategory);
router.delete("/:id", auth, deleteCategory);

export default router;
