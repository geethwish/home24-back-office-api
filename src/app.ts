import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import categoryRoutes from "./routes/category.route";
import productRoutes from "./routes/product.route";
import supportRoutes from "./routes/support.route";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/support", supportRoutes);

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Management Back Office API",
      version: "1.0.0",
      description: "API for managing product categories and products",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}/api/v1`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.resolve(__dirname, "../docs/swagger.yaml")], // Path to the API route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
