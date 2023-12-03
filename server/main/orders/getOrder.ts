
import { Order } from "../models/interfaces/Order";
import validateOrderSchema from "../models/joi/order";
import OrderModel, { OrderDocument } from "../models/schemas/Order";
import UserModel, { UserDocument } from "../models/schemas/User";
import { URequest, UResponse } from "../types";


//get all orders of the user
const getOrders = async(req: URequest, res: UResponse):Promise<UResponse>=> {
    try {
        const userOrders: OrderDocument[] = await OrderModel.find({ userId: req.user });
        return res.json({
            userOrders,
            message:`All these are the orders for individual user!`
        })
    }
    catch (err) {
        return res.json({
            err,
            message:"Internal Server Error!"
        })
    }
}
const getSpecificOrderByUser = async (req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        const orderId = req.params.id;
        const order: OrderDocument|null = await OrderModel.findOne({
            userId: req.user,
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
