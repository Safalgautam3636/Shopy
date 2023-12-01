import cancelOrder from "../orders/cancelOrder";
import computeTotalCost from "../orders/computeTotalCost";
import createOrder from "../orders/createOrder";
import { getOrders, getSpecificOrderByUser } from "../orders/getOrder";
import updateOrderStatus from "../orders/updateOrder";
import { Router } from "express";

const orderRoutes:Router = Router();

orderRoutes.post("/create-order/", createOrder);
orderRoutes.get("/get-order/:id/", getSpecificOrderByUser);
orderRoutes.get("/get-orders/", getOrders);
orderRoutes.put("/cancel-order/:id/", cancelOrder);
orderRoutes.put("/update-order/:id/", updateOrderStatus);
orderRoutes.get("/total-cost", computeTotalCost);



export default orderRoutes;