import { Request, Response } from "express";
import Product from "../models/product.model";
import { v4 as uuidv4 } from "uuid";

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const {
    page = 1,
    pageSize = 10,
    sortBy = "id",
    sortOrder = "asc",
  } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const pageSizeNumber = parseInt(pageSize as string, 10);
  const skip = (pageNumber - 1) * pageSizeNumber;
  const sortDirection = sortOrder === "desc" ? -1 : 1;
  const sortCriteria: { [key: string]: 1 | -1 } = {
    [sortBy as string]: sortDirection,
  };

  try {
    const products = await Product.find({
      category_id: categoryId,
    })
      .skip(skip)
      .limit(pageSizeNumber)
      .sort(sortCriteria);

    const totalProducts = await Product.countDocuments({
      category_id: categoryId,
    });
    const totalPages = Math.ceil(totalProducts / pageSizeNumber);

    res.status(200).json({
      products,
      currentPage: pageNumber,
      totalPages,
      pageSize: pageSizeNumber,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { productId } = req.params;
  console.log(productId);

  try {
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, category_id, price, attributes, imageUrl, description, stock } =
    req.body;

  try {
    const newProduct = new Product({
      id: uuidv4(),
      name,
      category_id,
      price,
      attributes,
      imageUrl,
      description,
      stock,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  const {
    page = 1,
    pageSize = 10,
    sortBy = "id",
    sortOrder = "asc",
  } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const pageSizeNumber = parseInt(pageSize as string, 10);
  const skip = (pageNumber - 1) * pageSizeNumber;
  const sortDirection = sortOrder === "desc" ? -1 : 1;
  const sortCriteria: { [key: string]: 1 | -1 } = {
    [sortBy as string]: sortDirection,
  };

  try {
    const products = await Product.find()
      .skip(skip)
      .limit(pageSizeNumber)
      .sort(sortCriteria);

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / pageSizeNumber);

    res.json({
      products,
      currentPage: pageNumber,
      totalPages,
      pageSize: pageSizeNumber,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { productId } = req.params;

  try {
    const product = await Product.findOneAndDelete({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};

export const updateProductById = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { productId } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: productId },
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(201).json(updatedProduct);
  } catch (err: any) {
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};
