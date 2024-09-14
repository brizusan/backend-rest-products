import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  updateProductAvailability,
} from "./handlers/product";
import { body } from "express-validator";
import { handleInpuntErrors } from "./middleware";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post(
  "/",
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number")
    .custom((value: number) => value > 0)
    .withMessage("price must be greater than 0"),
  handleInpuntErrors,
  createProduct
);

router.put(
  "/:id",
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number")
    .custom((value: number) => value > 0)
    .withMessage("price must be greater than 0"),
  body("availability").isBoolean().withMessage("invalid value availability"),
  handleInpuntErrors,
  updateProduct
);

router.patch("/:id", updateProductAvailability);

router.delete("/:id", deleteProduct);

export default router;
