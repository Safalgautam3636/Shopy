import { Order } from "../models/interfaces/Order";
import OrderModel, { OrderDocument } from "../models/schemas/Order";
import ProductModel from "../models/schemas/Product";
import { URequest, UResponse } from "../types";

const cancelOrder = async (req: URequest, res: UResponse) => {
    try {
        const userId = req.user;
        const orderId = req.params.orderId;
        const userOrder: OrderDocument | null = await OrderModel.findOne({ userId, _id: orderId });

        if (userOrder) {
            if (userOrder.orderStatus === 'Pending' || userOrder.orderStatus === 'Processing') {
                // Increment stockQuantity for each product in the canceled order
                for (const item of userOrder.items) {
                    const product = await ProductModel.findOne({ _id: item.productId });
                    if (product) {
                        product.stockQuantity += item.quantity;
                        await product.save();
                    }
                }

                userOrder.orderStatus = 'Cancelled';
                await userOrder.save();

                return res.status(200).json({
                    userOrder,
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
    } catch (err) {
        return res.status(500).json({
            err,
            message: "Internal Server Error!",
        });
    }
};

export default cancelOrder;
