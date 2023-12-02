import createProduct from "../products/createProduct";
import express from "express";
import deleteProdut from "../products/deleteProduct";
import { getAllProducts, getProductById } from "../products/getProduct";
import updateProduct from "../products/updateProduct";
import {
  getProduct,
  getProducts,
  deleteProduct,
  deleteProducts,
} from "../admin/product";
import authenticateUser from "../auth/authHelpers/auth";
import authenticateAdmin from "../auth/authHelpers/admin";

const productRoute = express.Router();



// Normal user routes


/**
 * @route GET /product/products
 * @description Get a list of all products.
 * @returns {Array<Product>} - List of products.
 */
productRoute.get("/product/products", getAllProducts);

/**
 * @route GET /product/product/:id
 * @description Get details of a specific product by ID.
 * @param {string} id - Product ID.
 * @returns {Product} - Details of the product.
 */
productRoute.get("/product/product/:id", getProductById);




// Admin routes



/**
 * @route POST /admin/product/create-product/
 * @description Create a new product (admin access).
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @param {Product} body - Data for creating the product.
 * @returns {Product} - Created product.
 */
productRoute.post(
  "/admin/product/create-product/",
  [authenticateUser, authenticateAdmin],
  createProduct
);

/**
 * @route PUT /admin/product/update-product/:id/
 * @description Update details of a specific product by ID (admin access).
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @param {string} id - Product ID.
 * @param {Product} body - Updated data for the product.
 * @returns {Product} - Updated product.
 */
productRoute.put(
  "/admin/product/update-product/:id/",
  [authenticateUser, authenticateAdmin],
  updateProduct
);

/**
 * @route DELETE /admin/product/delete-product/:id/
 * @description Delete a specific product by ID (admin access).
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @param {string} id - Product ID.
 * @returns {Product} - Deleted product.
 */
productRoute.delete(
  "/admin/product/delete-product/:id/",
  [authenticateUser, authenticateAdmin],
  deleteProduct
);

/**
 * @route DELETE /admin/product/delete-products/
 * @description Delete all products (admin access).
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @returns {Array<Product>} - List of deleted products.
 */
productRoute.delete(
  "/admin/product/delete-products/",
  [authenticateUser, authenticateAdmin],
  deleteProducts
);

export default productRoute;
