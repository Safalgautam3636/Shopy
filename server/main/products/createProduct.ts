//Create product
//user will pass the product information and you have to store into the db
// const productSchema = new Schema<ProductDocument>({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     stockQuantity: { type: Number, required: true },
//     category: { type: String, required: true },
//     brand: { type: String, required: true },
// })

import Product from "../models/interfaces/Product";
import validateProductSchema from "../models/joi/product";
import ProductModel from "../models/schemas/Product";
import { URequest, UResponse } from "../types";

const createProduct = async (req: URequest, res: UResponse) => {
    console.log('this reached at create route')
    try {
        let source = req.body;
        const name: string = source.name;
        const description: string = source.description;
        const price: number = source.price;
        const stockQuantity: number = source.stockQuantity;
        const category: string = source.category;
        const brand: string = source.brand;

        const productObject: Product = {
            name,
            description,
            price,
            stockQuantity,
            category,
            brand
        };
        const { error, value } = validateProductSchema.validate(productObject);
        if (!error) {
            const product = new ProductModel(value);
            await product.save();
            return res.json({
                product,
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
            message:"Internal Server error"
        })
    }
    

}

export default createProduct;