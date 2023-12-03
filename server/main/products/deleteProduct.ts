import { URequest, UResponse } from './../types';
import ProductModel from "../models/schemas/Product";
import { ObjectId } from 'mongodb';

const deleteProdut = async (req: URequest, res: UResponse) :Promise<UResponse>=> {
    try {
        const id = new ObjectId(req.params.id);
        console.log(id);
        const deletedProduct = await ProductModel.findByIdAndDelete(id,{new:true});
        return res.json({
            deletedProduct,
            sucess: true
        });
    }
    catch (err) {
        return res.json({
            error: err,
            message:"Internal server error"
        })
    }
}
export default deleteProdut;