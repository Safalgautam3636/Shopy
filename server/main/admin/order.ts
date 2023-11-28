import { ObjectId } from 'mongodb';
import { Order } from './../models/interfaces/Order';
//get all orders from all the users = active orders
//get cancelled orders
//cancel order

import { URequest, UResponse } from "../types";
import OrderModel, { OrderDocument } from '../models/schemas/Order';

//cancel orders
const getAllOrders = async(req: URequest, res: UResponse): Promise<UResponse> => {
    const allOrders = await OrderModel.find();
    if (allOrders) {
        res.json(
            {
                allOrders,
                message: "All orders sent to the client"
            }
        )
    }
    return res.json({
        message:"Orders not available"
    })
}
const cancelSpecificOrder = async (req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        const orderId = new ObjectId(req.params.id);
        const order: OrderDocument | null = await OrderModel.findOne({ _id:orderId });
        if (order) {
            if (order.orderStatus === 'Pending' || order.orderStatus === 'Processing') {
                order.orderStatus = 'Cancelled';
                await order.save();
                return res.json({
                    order,
                    message: "Order cancelled sucessfully"
                })
            }
        }
        return res.json({
            message: "Unable to cancel the order!"
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}
const cancelAllOrders = async (req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        const orders: OrderDocument[] | null = await OrderModel.find();
        if (orders) {
            orders.forEach(async(order) => {
                order.orderStatus = "Cancelled";
                await order.save();
            })
        }
        return res.json({
            message: "Cancelled all the orders!"
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}


export {
    getAllOrders,
    cancelSpecificOrder,
    cancelAllOrders
}