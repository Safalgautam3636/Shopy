import Joi from "joi";
import { ProductDocument } from "../schemas/Product";

const validateProductSchema = Joi.object<ProductDocument>({
    imgUrl: Joi.string().required(),
    name: Joi.string().required().min(4),
    description: Joi.string().min(5),
    price: Joi.number().required(),
    stockQuantity: Joi.number().required(),
    category: Joi.string().min(3).required(),
    brand: Joi.string(),
    ratings: Joi.number().required(),
    reviews:Joi.number().required(),
})

export default validateProductSchema;