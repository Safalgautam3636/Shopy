import { ObjectId } from 'mongodb';

import Product from "../models/interfaces/Product";
import validateProductSchema from "../models/joi/product";
import ProductModel, { ProductDocument } from "../models/schemas/Product";
import { URequest, UResponse } from "../types";


const updateProduct = async (req: URequest, res: UResponse) => {
    try {
        const id = new ObjectId(req.params.id)
        
        let product: ProductDocument = await ProductModel.findById(id) as ProductDocument;
        console.log(product)

        let bodyProduct= req.body;
        let newProductObject: any = {
            ...product.toObject(),
            ...bodyProduct
        };
        delete newProductObject._id;
        delete newProductObject.__v;


        const { error, value } = validateProductSchema.validate(newProductObject);
        if (!error) {
            const newProduct = await ProductModel.findByIdAndUpdate({ _id: id }, { value }, { new: true });
            return res.json({
                newProduct,
                status: true,
            })
        }
        else {
            return res.json({
                error:error
            })
        }
        
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal server error"
        })
    }
}

export default updateProduct;
