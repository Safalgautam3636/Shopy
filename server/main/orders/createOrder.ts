import { ObjectId } from 'mongodb';
import { Order } from "../models/interfaces/Order";
import validateOrderSchema from "../models/joi/order";
import OrderModel from "../models/schemas/Order";
import ProductModel, { ProductDocument } from "../models/schemas/Product";
import { URequest, UResponse } from "../types";

const createOrder = async (req: URequest, res: UResponse) => {
    try {
        let order = req.body;

        const orderObject: Order = { ...order, userId: req.user }
        orderObject.items.forEach(async(item) => {
            const product: ProductDocument|null= await ProductModel.findOne({ _id: item.productId });
            if (product?.stockQuantity !== undefined) {
                if (item.quantity <= product?.stockQuantity) {
                    product.stockQuantity -= item.quantity;
                    await product.save();
                }
            }
        })
        const { error, value } = validateOrderSchema.validate(orderObject);
        if (!error) {
            const order = new OrderModel(value);
            await order.save();
            return res.json({
                order,
                message: "Sucess",
                valid: true
            })

        }
        else {
            return res.json({
                error,
                message: "Some error occured",
            })
        }
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server error"
        })
    }


}

export default createOrder;