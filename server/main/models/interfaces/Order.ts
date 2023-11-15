import mongoose from "mongoose";
export interface Order{
    userId: mongoose.Schema.Types.ObjectId;
    orderDate: Date;
    totalAmount: number,
    items: OrderItem[];
}
export interface OrderItem{
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    subtotal: number;
}