import { Router } from "express";
import authenticateUser from "../auth/authHelpers/auth";
import authenticateAdmin from "../auth/authHelpers/admin";
import cancelOrder from "../orders/cancelOrder";
import createOrder from "../orders/createOrder";
import { getOrders, getSpecificOrderByUser } from "../orders/getOrder";
import updateOrderStatus from "../orders/updateOrder";
import {
  cancelAllOrders,
  cancelSpecificOrder,
  getAllOrders,
  updateOrderAdmin,
} from "../admin/order";

/**
 * @typedef {Object} OrderResponse - Response object for order-related routes.
 * @property {string} message - A message indicating the status or result of the operation.
 * @property {object} [order] - Details of the order (if applicable).
 */

const orderRoutes: Router = Router();

/**
 * Create a new order.
 * @route POST /order/create-order/
 * @param {string} Authorization - User's authentication token.
 * @param {object} body - Data for creating the order.
 * @returns {OrderResponse} - Order creation result.
 */
orderRoutes.post("/order/create-order/", authenticateUser, createOrder);

/**
 * Get details of a specific order for a user.
 * @route GET /order/get-order/:id/
 * @param {string} Authorization - User's authentication token.
 * @param {string} id - Order ID.
 * @returns {OrderResponse} - Order details.
 */
orderRoutes.get(
  "/order/get-order/:id/",
  authenticateUser,
  getSpecificOrderByUser
);

/**
 * Get a list of all orders for a user.
 * @route GET /order/get-orders/
 * @param {string} Authorization - User's authentication token.
 * @returns {OrderResponse} - List of user's orders.
 */
orderRoutes.get("/order/get-orders/", authenticateUser, getOrders);

/**
 * Cancel a specific order for a user.
 * @route PUT /order/cancel-order/:id/
 * @param {string} Authorization - User's authentication token.
 * @param {string} id - Order ID.
 * @returns {OrderResponse} - Order cancellation result.
 */
orderRoutes.put("/order/cancel-order/:id/", authenticateUser, cancelOrder);

/**
 * Update the status of a specific order for a user.
 * @route PUT /order/update-order/:id/
 * @param {string} Authorization - User's authentication token.
 * @param {string} id - Order ID.
 * @param {object} body - Data for updating the order status.
 * @returns {OrderResponse} - Order status update result.
 */
orderRoutes.put(
  "/order/update-order/:id/",
  authenticateUser,
  updateOrderStatus
);

/**
 * Admin operations.
 */

/**
 * Get a list of all orders (admin access).
 * @route GET /admin/order/orders
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @returns {OrderResponse} - List of all orders.
 */
orderRoutes.get(
  "/admin/order/orders",
  [authenticateUser, authenticateAdmin],
  getAllOrders
);

/**
 * Cancel all orders (admin access).
 * @route PUT /admin/order/cancel-orders/
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @returns {OrderResponse} - All orders cancellation result.
 */
orderRoutes.put(
  "/admin/order/cancel-orders/",
  [authenticateUser, authenticateAdmin],
  cancelAllOrders
);

/**
 * Cancel a specific order (admin access).
 * @route PUT /admin/order/cancel-order/:id/
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @param {string} id - Order ID.
 * @returns {OrderResponse} - Order cancellation result.
 */
orderRoutes.put(
  "/admin/order/cancel-order/:id/",
  [authenticateUser, authenticateAdmin],
  cancelSpecificOrder
);

/**
 * Update the status of a specific order (admin access).
 * @route PUT /admin/order/update-order/:id/
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @param {string} id - Order ID.
 * @param {object} body - Data for updating the order status.
 * @returns {OrderResponse} - Order status update result.
 */
orderRoutes.put(
  "/admin/order/update-order/:id/",
  [authenticateUser, authenticateAdmin],
  updateOrderAdmin
);

export default orderRoutes;
