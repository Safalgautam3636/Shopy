import createProduct from "../products/createProduct";
import express from "express";
import deleteProdut from "../products/deleteProduct";
import { getAllProducts, getProductById } from "../products/getProduct";
import updateProduct from "../products/updateProduct";
import {getProduct,getProducts,deleteProduct,deleteProducts } from "../admin/product"
const productRoute = express.Router();

productRoute.post("/create-product", createProduct);
productRoute.delete("/delete-product/:id", deleteProdut);
productRoute.get("/get-products", getAllProducts);
productRoute.get("/get-product/:id", getProductById);
productRoute.put("/update-product/:id", updateProduct);

// admin routes
productRoute.get("/admin/product/:id/", getProduct);
productRoute.get("/admin/products", getProducts);
productRoute.get("/admin/delete-product/:id/", deleteProduct);
productRoute.get("/admin/delete-products/", deleteProducts);




export default productRoute;