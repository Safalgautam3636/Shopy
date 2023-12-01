import { ObjectId } from 'mongodb';
import { Order, OrderItem } from "../models/interfaces/Order";
import validateOrderSchema from "../models/joi/order";
import OrderModel, { OrderDocument } from "../models/schemas/Order";
import ProductModel, { ProductDocument } from "../models/schemas/Product";
import { URequest, UResponse } from "../types";

const createOrder = async (req: URequest, res: UResponse):Promise<UResponse> => {
    try {
        const orderObject: Order = req.body as Order;
        let total = 0;
        const updateOrder= orderObject.items.map(async (item: OrderItem) => {
            try {
                const product: ProductDocument | null = await ProductModel.findOne({ _id: item.productId });
                if (product?.stockQuantity !== undefined) {
                    if (item.quantity <= product?.stockQuantity) {

                        product.stockQuantity -= item.quantity;
                        const amount: number = Number(item.quantity) * Number(product.price);
                        item["unitPrice"] = product.price;
                        item["subtotal"] = amount;
                        total += amount;
                        orderObject.totalAmount = total;
                        await product.save();
                    }
                }
            }
            catch (err) {
                return res.json({
                    err,
                    message:"Server failed!"
                })
            }
           

        });
        await Promise.all(updateOrder);

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
        return res.json({
            error,
            message: "Some error occured",
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server error"
        })
    }


}

export default createOrder;