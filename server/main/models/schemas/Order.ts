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
    unitPrice: {
        type:Number
    },
    subtotal: {
        type: Number
    }
})
const OrderSchema = new Schema<OrderDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number},
    items: {
        type: [OrderItemSchema],
        required: true
    }, orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
        required: true,
    },
    isPaid: {
        type: Boolean,
        default:false
    }
})

const OrderModel = mongoose.model<OrderDocument>('Order', OrderSchema);

export default OrderModel;