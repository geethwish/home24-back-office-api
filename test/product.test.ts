import request from "supertest";
import express from "express";
import router from "../src/routes/product.route";
import auth from "../src/middleware/auth.middleware";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from "../src/controllers/product.controller";

// Mock the auth middleware and controller functions
jest.mock("../src/middleware/auth.middleware", () =>
  jest.fn((req, res, next) => next())
);
jest.mock("../src/controllers/product.controller", () => ({
  createProduct: jest.fn((req, res) => res.status(201).send("Product created")),
  getAllProducts: jest.fn((req, res) => res.status(200).send("All products")),
  getProductById: jest.fn((req, res) => res.status(200).send("Product by ID")),
  getProductsByCategory: jest.fn((req, res) =>
    res.status(200).send("Products by category")
  ),
}));

// Create an Express app and use the router
const app = express();
app.use(express.json());
app.use("/products", router);

describe("Product Routes", () => {
  it("POST /products - should call createProduct", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "Test Product" });
    expect(response.status).toBe(201);
    expect(createProduct).toHaveBeenCalled();
  });

  it("GET /products - should call getAllProducts", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(getAllProducts).toHaveBeenCalled();
  });

  it("GET /products/categories/:categoryId - should call getProductsByCategory", async () => {
    const response = await request(app).get("/products/categories/123");
    expect(response.status).toBe(200);
    expect(getProductsByCategory).toHaveBeenCalled();
  });

  it("PUT /products/:productId - should return 404 (not implemented)", async () => {
    const response = await request(app).put("/products/123");
    expect(response.status).toBe(404);
  });

  it("DELETE /products/:productId - should call getProductById", async () => {
    const response = await request(app).delete("/products/123");
    expect(response.status).toBe(200);
    expect(getProductById).toHaveBeenCalled();
  });

  it("GET /products/:productId - should call getProductById", async () => {
    const response = await request(app).get("/products/123");
    expect(response.status).toBe(200);
    expect(getProductById).toHaveBeenCalled();
  });
});
