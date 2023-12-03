import { ObjectId } from "mongodb";
import ProductModel, { ProductDocument } from "../models/schemas/Product";
import { URequest, UResponse } from "../types";

const getAllProducts = async (
  req: URequest,
  res: UResponse
): Promise<UResponse> => {
  try {
    const allProducts: ProductDocument[] = await ProductModel.find({});
    return res.json({
      allProducts,
      status: true,
    });
  } catch (err) {
    return res.json({
      err,
      message: "Internal server error",
    });
  }
};

const getProductById = async (
  req: URequest,
  res: UResponse
): Promise<UResponse> => {
  try {
    const id = new ObjectId(req.params.id);
    const product: ProductDocument | null = await ProductModel.findOne({
      _id: id,
    });
    if (product === null) {
      return res.json({
        message: "No product with such Id!",
      });
    }
    return res.json({
      product,
      status: true,
    });
  } catch (err) {
    return res.json({
      err,
      message: "Internal server error",
    });
  }
};
export { getAllProducts, getProductById };
