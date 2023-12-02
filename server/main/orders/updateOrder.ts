import { ObjectId } from 'mongodb';
//"/api/orders/:orderId/status"
import { Order } from "../models/interfaces/Order";
import validateOrderSchema from "../models/joi/order";
import OrderModel, { OrderDocument } from "../models/schemas/Order";
import { URequest, UResponse } from "../types";
import { UserDocument } from "../models/schemas/User";
import UserModel from "../models/schemas/User";

type StatusMap = {
    [key: string]: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
};


const updateOrderStatus = async (req: URequest, res: UResponse) => {
    try {
        const status_map:StatusMap = { "pending": 'Pending', "processing": 'Processing', "shipped": 'Shipped', "delivered": 'Delivered', "cancelled": 'Cancelled' };
        const newStatus = req.body.orderStatus;
        console.log(newStatus)
        const updateStatus: string = status_map[newStatus] as string;
        console.log(updateStatus)
        const orderId = new ObjectId(req.params.id);
        const userOrders: OrderDocument | null = await OrderModel.findOne({ userId: req.user, _id: orderId });
        if (userOrders) {
            userOrders.orderStatus = updateStatus;
            await userOrders.save();
            return res.json({ userOrders, message: "Order cancelled sucessfully" });
        }
        return res.json({
            message: "Unable to update the order!"
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