import cancelOrder from "../orders/cancelOrder";
import computeTotalCost from "../orders/computeTotalCost";
import createOrder from "../orders/createOrder";
import { getOrders, getSpecificOrderByUser } from "../orders/getOrder";
import updateOrderStatus from "../orders/updateOrder";
import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/get-order/:id", getSpecificOrderByUser);
orderRouter.get("/get-orders/", getOrders);
orderRouter.put("/cancel-order/", cancelOrder);
orderRouter.get("/total-cost", computeTotalCost);
orderRouter.get("/create-order", createOrder);
orderRouter.put("/update-order", updateOrderStatus);


export default orderRouter;