import Joi from "joi";
import { UserDocument } from "../schemas/User";

const validateUserSchema = Joi.object<UserDocument>({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
})

export default validateUserSchema;