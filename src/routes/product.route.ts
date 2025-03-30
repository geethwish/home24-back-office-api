import express from "express";
import auth from "../middleware/auth.middleware";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from "../controllers/product.controller";

const router = express.Router();

router.post("/", auth, createProduct);
router.get("/", auth, getAllProducts);
router.get("/categories/:categoryId", auth, getProductsByCategory);
router.put("/:productId", auth);
router.delete("/:productId", auth, getProductById);
router.get("/:productId", auth, getProductById);

export default router;
