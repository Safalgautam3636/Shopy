import { Order, OrderItem } from "../interfaces/Order";
import mongoose, { Document, Schema } from "mongoose";

export interface orderItemDocument extends OrderItem, Document{
    
}

export interface OrderDocument extends Order, Document {

}
const OrderItemSchema = new Schema<orderItemDocument>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    }
})
const OrderSchema = new Schema<OrderDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    items: {
        type: [OrderItemSchema],
        required: true
    }
})

const OrderModel = mongoose.model<OrderDocument>('Order', OrderSchema);

export default OrderModel;