import Joi from "joi";

import { OrderDocument,orderItemDocument } from "../schemas/Order";

const validateOrderItemSchema = Joi.object<orderItemDocument>({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
    subtotal: Joi.number().required(),
    unitPrice: Joi.number().required()
})
const validateOrderSchema = Joi.object<OrderDocument>({
    userId: Joi.string().required(),
    orderDate: Joi.date().default(new Date(Date.now())),
    totalAmount: Joi.number().required(),
    items: Joi.array().items(validateOrderItemSchema).required(),
    orderStatus:Joi.string()
})

export default validateOrderSchema;