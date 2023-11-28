
import { Order } from "../models/interfaces/Order";
import validateOrderSchema from "../models/joi/order";
import OrderModel, { OrderDocument } from "../models/schemas/Order";
import { URequest, UResponse } from "../types";


//get all orders of the user
const getOrders = async(req: URequest, res: UResponse) => {
    try {
        const userId = req.user;
        const userOrders: OrderDocument[] = await OrderModel.find({ userId: userId });
        return {
            userOrders,
            message:"User orders sucessfully retrived!"
        }
    }
    catch (err) {
        return res.json({
            err,
            message:"Internal Server Error!"
        })
    }
}
const getSpecificOrderByUser = async (req: URequest, res: UResponse) => {
    try {
        const userId = req.user;
        const orderId = req.params.orderId;
        const order: OrderDocument|null = await OrderModel.findOne({
            userId: userId,
            _id: orderId
        });
        if (order) {
            return res.json({
                order,
                message: "User orders sucessfully retrived!"
            });
        }
        return res.json({
            message:"Order not found",
        })
        
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}
export{getOrders,getSpecificOrderByUser}
//get the specific order of the specific user
