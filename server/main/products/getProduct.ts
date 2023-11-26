import { ObjectId } from 'mongodb';

import Product from "../models/interfaces/Product";
import validateProductSchema from "../models/joi/product";
import ProductModel from "../models/schemas/Product";
import { URequest, UResponse } from "../types";

const getAllProducts = async (req: URequest, res: UResponse) => {
    try {
        const allProducts = await ProductModel.find({});
        return res.json({
            allProducts,
            status: true,
        })
    }
    catch (err) {
        return res.json({
            err,
            message:"Internal server error"
        })
    }
}

const getProductById = async (req: URequest, res: UResponse) => {
    try {
        const id = new ObjectId(req.params.id);
        const product = await ProductModel.findOne({_id:id});
        return res.json({
            product,
            status: true,
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal server error"
        })
    }
}

export {
    getAllProducts,
    getProductById
}