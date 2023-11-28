//"/api/orders/:orderId/status"
import { Order } from "../models/interfaces/Order";
import validateOrderSchema from "../models/joi/order";
import OrderModel, { OrderDocument } from "../models/schemas/Order";
import { URequest, UResponse } from "../types";

const updateOrderStatus = async(req: URequest, res: UResponse) => {
    try {
        const userId = req.user;
        const orderId = req.params.orderId;
        const newStatus = req.body.status;
        const userOrders: OrderDocument | null = await OrderModel.findOne({ userId: userId, _id: orderId });
        if (userOrders) {
            userOrders.orderStatus = newStatus;
            await userOrders.save();
            return res.json({ userOrders, message: "Order cancelled sucessfully" });
        }
        return res.json({
            message: "Unable to cancel the order!"
        });
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}
export default updateOrderStatus;