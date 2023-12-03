import Joi from "joi";
import { UserDocument } from "../schemas/User";
import { hashPassword } from "../../auth/authHelpers/passwordHelpers";

const validateUserSchema = Joi.object<UserDocument>({
    username: Joi.string().min(5).required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    isAdmin: Joi.boolean().default(false)
})

export default validateUserSchema;