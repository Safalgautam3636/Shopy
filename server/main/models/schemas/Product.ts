import Product from "../interfaces/Product";
import mongoose, { Document, Schema } from "mongoose";

export interface ProductDocument extends Product, Document {

}
const productSchema = new Schema<ProductDocument>({
    imgUrl: { type:String,required:true},
    name: { type: String, required: true },
    description: { type: String},
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    ratings: { type: Number, required: true },
    reviews: { type: Number, required: true },
})

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel