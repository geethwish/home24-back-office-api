import express from "express";

const router = express.Router();

router.get("/categories/:categoryId/products");
router.get("/products/:productId");
router.put("/products/:productId");
router.delete("/products/:productId");

export default router;
