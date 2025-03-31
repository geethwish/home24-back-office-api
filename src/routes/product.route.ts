import express from "express";
import auth from "../middleware/auth.middleware";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProductById,
} from "../controllers/product.controller";

const router = express.Router();

router.post("/", auth, createProduct);
router.get("/", auth, getAllProducts);
router.get("/categories/:categoryId", auth, getProductsByCategory);
router.patch("/:productId", auth, updateProductById);
router.delete("/:productId", auth, deleteProductById);
router.get("/:productId", auth, getProductById);

export default router;
