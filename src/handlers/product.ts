import { Request, Response } from "express";
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product, message: "Product created" });
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll(
      {
        order:[['id', 'ASC']]
      }
    );
    if (!products)
      return res.status(404).json({ message: "Products not found" });
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id: id } });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).json({ product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id: id } });
  if (!product) return res.status(404).json({ message: "Product not found" });
  await product.update(req.body);
  res.status(200).json({ product });
};


export const updateProductAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id: id } });
  if (!product) return res.status(404).json({ message: "Product not found" });
  await product.update({ availability: !product.dataValues.availability });
  res.status(200).json({ message: "Product availability updated" });
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id: id } });
  if (!product) return res.status(404).json({ message: "Product not found" });
  await product.destroy();
  res.status(200).json({ message: "Product deleted" });
};
