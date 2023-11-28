import { ObjectId } from 'mongodb';
// delete product
//update product
//getProducts
//getProduct
//delete products

import { URequest, UResponse } from "../types";
import ProductModel, { ProductDocument } from '../models/schemas/Product';

const getProduct = async (req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        const productId = new ObjectId(req.params.id);
        const product: ProductDocument | null = await ProductModel.findOne({ _id: productId });
        if (!product) {
            return res.json({
                product,
                message: "Product Fetched"
            })
        }
        return res.json({
            message: "Couldnot find the product!"
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}
const getProducts = async (req: URequest, res: UResponse): Promise<UResponse> => {
    try {

        const product: ProductDocument[] | null = await ProductModel.find();
        if (!product) {
            return res.json({
                product,
                message: "Products Fetched"
            })
        }
        return res.json({
            message: "Couldnot find the products!"
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}
const deleteProduct = async (req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        const productId = new ObjectId(req.params.id);
        await ProductModel.deleteOne({ _id: productId });
        return res.json({
                
                message: "Product Deleted"
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}
const deleteProducts = async (req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        await ProductModel.deleteMany();
        return res.json({
            message: "Products Deleted"
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}

//update products from the product folder  then we can protect with the auth route

export {
    getProduct,
    getProducts,
    deleteProduct,
    deleteProducts
}