import UserModel, { UserDocument } from "../models/schemas/User";
import { URequest, UResponse } from "../types";

const getOwnUserProfile = async (req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        const userId:string = req.user;
        const user: UserDocument = await UserModel.findOne({
            _id:userId
        }) as UserDocument;
        return res.json({
            user,
            message: "User found!",
        })

    }
    catch (err) {
        return res.json({
            err,
            message:"Internal server error!"
        })
    }
}
export default getOwnUserProfile;