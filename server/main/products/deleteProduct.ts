import { URequest, UResponse } from './../types';
import ProductModel from "../models/schemas/Product";
import { ObjectId } from 'mongodb';

const deleteProdut = async (req: URequest, res: UResponse) => {
    try {
        const id = new ObjectId(req.params.id);
        const deletedProduct = await ProductModel.deleteOne({ _id: id });
        console.log(deleteProdut)
        return res.json({
            deletedProduct,
            sucess: true
        });
    }
    catch (err) {
        console.log(err);
        return res.json({
            error: err,
            message:"Internal server error"
        })
    }
}

export default deleteProdut;