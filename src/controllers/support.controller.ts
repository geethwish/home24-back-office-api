import { Request, Response } from "express";
import Product from "../models/product.model";
import Category from "../models/category.model";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // Get the last modified product details
    const latestProduct = await Product.findOne()
      .sort({ updated_at: -1 })
      .exec();

    const recentlyAddedProducts = await Product.findOne()
      .sort({ created_at: -1 })
      .exec();

    // Get total categories count
    const totalCategoriesCount = await Category.countDocuments().exec();

    // Get total product count
    const totalProductCount = await Product.countDocuments().exec();

    // Combine all data into a single response
    res.status(200).json({
      latestProduct,
      recentlyAddedProducts,
      totalCategoriesCount,
      totalProductCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
