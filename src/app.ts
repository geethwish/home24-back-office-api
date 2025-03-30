import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import categoryRoutes from "./routes/category.route";
import productRoutes from "./routes/product.route";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);

export default app;
