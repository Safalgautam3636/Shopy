import Product from "../interfaces/Product";
import mongoose, { Document, Schema } from "mongoose";

interface ProductDocument extends Product, Document {

}
const productSchema = new Schema<ProductDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
})

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel