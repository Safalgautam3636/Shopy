
import { Order } from "../models/interfaces/Order";
import validateOrderSchema from "../models/joi/order";
import OrderModel, { OrderDocument } from "../models/schemas/Order";
import { URequest, UResponse } from "../types";


const computeTotalCost = async (req: URequest, res: UResponse) => {
    try {
        const userId = req.user;
        const orderId = req.params.orderId;
        const userOrders: OrderDocument | null = await OrderModel.findOne({ userId: userId, _id: orderId });
        if (userOrders) {
            let total = 0;
            userOrders.items.forEach((item) => {
                let temp = item.subtotal * item.quantity;
                total += temp;
            })
            return res.json({
                totalCost: total,
                message:"Here is the price for this order"
            })
        }
        return res.json({
            message:"Unable to find the particular order"
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}

export default computeTotalCost;
