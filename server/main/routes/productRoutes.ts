import createProduct from "../products/createProduct";
import express from "express";
import deleteProdut from "../products/deleteProduct";
import { getAllProducts, getProductById } from "../products/getProduct";
import updateProduct from "../products/updateProduct";
const productRoute = express.Router();

productRoute.post("/create-product", createProduct);
productRoute.delete("/delete-product/:id", deleteProdut);
productRoute.get("/get-products", getAllProducts);
productRoute.get("/get-product/:id", getProductById);
productRoute.put("/update-product/:id", updateProduct);

export default productRoute;