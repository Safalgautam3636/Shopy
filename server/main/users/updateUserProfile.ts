import { hashPassword } from "../auth/authHelpers/passwordHelpers";
import validateUserSchema from "../models/joi/user";
import UserModel, { UserDocument } from "../models/schemas/User";
import { URequest, UResponse } from "../types";

const updateOwnUserProfile = async (req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        const userId: string = req.user;
        const user: UserDocument|null= await UserModel.findOne({
            _id:userId
        });
        const newUser = {
            ...user?.toObject(),
            ...req.body
        };
        delete newUser._id;
        delete newUser.__v;
        if (req.body?.password!==undefined) {
            newUser.password = await hashPassword(req.body.password);
        }
        if (req.body?.isAdmin !== undefined) {
            if (!user?.isAdmin) {
                return res.json({
                    message: "Only admin can modify this!"
                })
            }
        }
        const { error, value } = validateUserSchema.validate(newUser);
        
        if (!error) {
            await UserModel.updateOne({_id:userId}, value);
            const updatedUser = await UserModel.findOne({ _id: userId});
            return res.json({
                updatedUser,
                message:"User updated!"
            })
        }
        return res.json({
            error,
            message: "Error!",
        })

    }
    catch (err) {
        return res.json({
            err,
            message: "Internal server error!"
        })
    }
}
export default updateOwnUserProfile;