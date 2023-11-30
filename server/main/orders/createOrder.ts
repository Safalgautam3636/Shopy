import { ObjectId } from 'mongodb';
import { Order } from "../models/interfaces/Order";
import validateOrderSchema from "../models/joi/order";
import OrderModel, { OrderDocument } from "../models/schemas/Order";
import ProductModel, { ProductDocument } from "../models/schemas/Product";
import { URequest, UResponse } from "../types";

const createOrder = async (req: URequest, res: UResponse):Promise<UResponse> => {
    try {
        const orderObject: Order = req.body;
        let total = 0;
        const updatePromise=orderObject.items.map(async (item) => {
            
            const product: ProductDocument | null = await ProductModel.findOne({ _id: item.productId });
            
            if (product?.stockQuantity !== undefined) {
                if (item.quantity <= product?.stockQuantity) {

                    product.stockQuantity -= item.quantity;
                    const amount: number = Number(item.quantity) * Number(product.price);
                    console.log(amount)
                    item["unitPrice"] = product.price;
                    console.log(item.unitPrice);
                    item["subtotal"] = amount;
                    console.log(amount)
                    total += amount;
                    orderObject.totalAmount = total;
                    await product.save();
                }
            }

        });
        

        await Promise.all(updatePromise);
        console.log(orderObject);

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