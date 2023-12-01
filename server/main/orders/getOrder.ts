
import { Order } from "../models/interfaces/Order";
import validateOrderSchema from "../models/joi/order";
import OrderModel, { OrderDocument } from "../models/schemas/Order";
import UserModel, { UserDocument } from "../models/schemas/User";
import { URequest, UResponse } from "../types";


//get all orders of the user
const getOrders = async(req: URequest, res: UResponse):Promise<UResponse>=> {
    try {
        const user: UserDocument|null = await UserModel.findOne({ username: req.user });
        const userOrders: OrderDocument[] = await OrderModel.find({ userId: user?._id });
        return res.json({
            userOrders,
            message:`All these are the orders for ${user?.username}!`
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
        const user: UserDocument | null = await UserModel.findOne({ username: req.user });
        const order: OrderDocument|null = await OrderModel.findOne({
            userId: user?._id,
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
