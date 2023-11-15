import User from "../interfaces/User";
import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends User, Document {

}
const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
})

const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;