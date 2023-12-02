import createProduct from "../products/createProduct";
import express from "express";
import deleteProdut from "../products/deleteProduct";
import { getAllProducts, getProductById } from "../products/getProduct";
import updateProduct from "../products/updateProduct";
import { getProduct, getProducts, deleteProduct, deleteProducts } from "../admin/product"
import authenticateUser from "../auth/authHelpers/auth";
import authenticateAdmin from "../auth/authHelpers/admin";

const productRoute = express.Router();


//normal user
productRoute.get("/product/products", getAllProducts);
productRoute.get("/product/product/:id", getProductById);

// admin routes
productRoute.post("/admin/product/create-product/", [authenticateUser, authenticateAdmin], createProduct);
productRoute.put("/admin/product/update-product/:id/", [authenticateUser, authenticateAdmin], updateProduct);
productRoute.delete("/admin/product/delete-product/:id/", [authenticateUser, authenticateAdmin], deleteProdut);
productRoute.delete("/admin/product/delete-products/", [authenticateUser, authenticateAdmin], deleteProducts);




export default productRoute;