import Product from "../models/interfaces/Product";
import validateProductSchema from "../models/joi/product";
import ProductModel from "../models/schemas/Product";
import { URequest, UResponse } from "../types";

const createProduct = async (req: URequest, res: UResponse) => {
  console.log("Create Product");
  try {
    let source = req.body;
    const name: string = source.name;
    // TODO: remove description
    const description: string = "temporary";
    const price: number = source.price;
    const stockQuantity: number = source.stockQuantity;
    const category: string = source.category;
    // TODO: remove brand
    const brand: string = "temporary";
    const reviews: number = source.reviews;
    const ratings: number = source.ratings;
    const imgUrl: string = source.imgUrl;
    const productObject: Product = {
      name,
      description,
      price,
      stockQuantity,
      category,
      brand,
      reviews,
      ratings,
      imgUrl,
    };
    console.log(productObject);
    const { error, value } = validateProductSchema.validate(productObject);
    if (!error) {
      const product = new ProductModel(value);
      await product.save();
      return res.json({
        product,
        message: "Sucess",
        valid: true,
      });
    } else {
      return res.json({
        error,
        message: "Some error occured",
      });
    }
  } catch (err) {
    return res.json({
      err,
      message: "Internal Server error",
    });
  }
};
export default createProduct;
