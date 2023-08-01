import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";
const router = express.Router();
// create a route to get all products
router.route("/").get(getProducts);
// create a route to get a single product
router.route("/:id").get(getProductById);

export default router;
