import { ObjectId } from 'mongodb';
import { Order } from './../models/interfaces/Order';
//get all orders from all the users = active orders
//get cancelled orders
//cancel order

import { URequest, UResponse } from "../types";
import OrderModel, { OrderDocument } from '../models/schemas/Order';
import ProductModel from '../models/schemas/Product';

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
                // Increment stockQuantity for each product in the canceled order
                for (const item of order.items) {
                    const product = await ProductModel.findOne({ _id: item.productId });
                    if (product) {
                        product.stockQuantity += item.quantity;
                        await product.save();
                    }
                }

                order.orderStatus = 'Cancelled';
                await order.save();

                return res.status(200).json({
                    order,
                    message: "Order cancelled successfully. Products added back to inventory.",
                });
            } else {
                return res.status(400).json({
                    message: "Unable to cancel the order. Invalid order status for cancellation.",
                });
            }
        } else {
            return res.status(404).json({
                message: "Order not found.",
            });
        }
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
            const resolveOrders = orders.map(async (order) => {
                for (const item of order.items) {
                    const product = await ProductModel.findOne({ _id: item.productId });
                    if (product) {
                        product.stockQuantity += item.quantity;
                        await product.save();
                    }
                }
                order.orderStatus = "Cancelled";
                await order.save();
            })
            Promise.all(resolveOrders);
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
type StatusMap = {
  [key: string]:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
};
const updateOrderAdmin = async (req: URequest, res: UResponse) => {
  try {
    const status_map: StatusMap = {
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
    };
    const newStatus = req.body.orderStatus;
    console.log(newStatus);
    const updateStatus: string = status_map[newStatus] as string;
    console.log(updateStatus);
    const orderId = new ObjectId(req.params.id);
    const userOrders: OrderDocument | null = await OrderModel.findOne({
      _id: orderId,
    });
    if (userOrders) {
      userOrders.orderStatus = updateStatus;
      await userOrders.save();
      return res.json({ userOrders, message: "Order updated sucessfully" });
    }
    return res.json({
      message: "Unable to update the order!",
    });
  } catch (err) {
    return res.json({
      err,
      message: "Internal Server Error!",
    });
  }
};

export {
    getAllOrders,
    cancelSpecificOrder,
    cancelAllOrders,
    updateOrderAdmin
}