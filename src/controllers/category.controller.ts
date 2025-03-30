import { Request, Response } from "express";
import Category from "../models/category.model";
import { v4 as uuidv4 } from "uuid";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ id: id });
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    const newCategory = new Category({
      id: uuidv4(),
      name,
      description,
    });

    console.log(newCategory);

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { id: id },
      { name, description },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(201).json(updatedCategory);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findOneAndDelete({
      id: id,
    });
    if (!deletedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json({ msg: "Category deleted" });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};
