import request from "supertest";
import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../src/controllers/category.controller";
import Category from "../src/models/category.model";

// Mock the Category model
jest.mock("../src/models/category.model");

const app = express();
app.use(express.json());

// Mock routes for testing
app.get("/categories", getAllCategories);
app.get("/categories/:id", getCategoryById);
app.post("/categories", createCategory);
app.put("/categories/:id", updateCategory);
app.delete("/categories/:id", deleteCategory);

describe("Category Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET /categories - should return all categories", async () => {
    (Category.find as jest.Mock).mockResolvedValue([
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ]);

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ]);
    expect(Category.find).toHaveBeenCalled();
  });

  it("GET /categories/:id - should return a category by ID", async () => {
    (Category.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Category 1",
    });

    const response = await request(app).get("/categories/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "Category 1" });
    expect(Category.findOne).toHaveBeenCalledWith({ _id: "1" });
  });

  it("GET /categories/:id - should return 404 if category not found", async () => {
    (Category.findOne as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/categories/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ msg: "Category not found" });
  });

  it("POST /categories - should create a new category", async () => {
    jest.spyOn(Category.prototype, "save").mockResolvedValue({
      id: 1,
      name: "New Category",
      description: "Test Description",
    });

    const response = await request(app)
      .post("/categories")
      .send({ name: "New Category", description: "Test Description" });

    expect(Category.prototype.save).toHaveBeenCalled();
    expect(response.status).toBe(201);
  });

  it("PUT /categories/:id - should update a category", async () => {
    (Category.findOneAndUpdate as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Updated Category",
      description: "Updated Description",
    });

    const response = await request(app)
      .put("/categories/1")
      .send({ name: "Updated Category", description: "Updated Description" });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: "Updated Category",
      description: "Updated Description",
    });
    expect(Category.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "1" },
      { name: "Updated Category", description: "Updated Description" },
      { new: true }
    );
  });

  it("PUT /categories/:id - should return 404 if category not found", async () => {
    (Category.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .put("/categories/1")
      .send({ name: "Updated Category", description: "Updated Description" });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ msg: "Category not found" });
  });

  it("DELETE /categories/:id - should delete a category", async () => {
    (Category.findOneAndDelete as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Deleted Category",
    });

    const response = await request(app).delete("/categories/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ msg: "Category deleted" });
    expect(Category.findOneAndDelete).toHaveBeenCalledWith({ _id: "1" });
  });

  it("DELETE /categories/:id - should return 404 if category not found", async () => {
    (Category.findOneAndDelete as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete("/categories/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ msg: "Category not found" });
  });
});
