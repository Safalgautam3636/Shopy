import mongoose from "mongoose";
export interface Order{
    userId: mongoose.Schema.Types.ObjectId;
    orderDate: Date;
    totalAmount: number,
    items: OrderItem[];
    orderStatus: string;
    isPaid:boolean
}
export interface OrderItem{
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}