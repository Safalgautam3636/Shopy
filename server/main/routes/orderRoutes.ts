import cancelOrder from "../orders/cancelOrder";
import createOrder from "../orders/createOrder";
import { getOrders, getSpecificOrderByUser } from "../orders/getOrder";
import updateOrderStatus from "../orders/updateOrder";
import { Router } from "express";
import {cancelAllOrders,cancelSpecificOrder,getAllOrders, updateOrderAdmin} from "../admin/order";
import authenticateUser from "../auth/authHelpers/auth";
import authenticateAdmin from "../auth/authHelpers/admin";

const orderRoutes:Router = Router();

orderRoutes.post("/order/create-order/",authenticateUser ,createOrder);
orderRoutes.get("/order/get-order/:id/", authenticateUser,getSpecificOrderByUser);
orderRoutes.get("/order/get-orders/", authenticateUser, getOrders);
orderRoutes.put("/order/cancel-order/:id/", authenticateUser, cancelOrder);
orderRoutes.put("/order/update-order/:id/", authenticateUser,updateOrderStatus);

//all admin
orderRoutes.get("/admin/order/orders",[authenticateUser,authenticateAdmin] ,getAllOrders);
orderRoutes.put("/admin/order/cancel-orders/",[authenticateUser,authenticateAdmin] ,cancelAllOrders);
orderRoutes.put("/admin/order/cancel-order/:id/",[authenticateUser,authenticateAdmin] , cancelSpecificOrder);
orderRoutes.put("/admin/order/update-order/:id/",[authenticateUser,authenticateAdmin] , updateOrderAdmin);
orderRoutes.get("/admin/order/orders/",[authenticateUser,authenticateAdmin] ,getAllOrders);

export default orderRoutes;