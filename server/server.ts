
import express, { Express } from "express";
import dotenv from "dotenv";
import invokeDB from "./main/db/setupDb";

import userRouter from "./main/routes/userRoutes";
import authenticateUser from "./main/auth/authHelpers/auth";
import { URequest, UResponse } from "./main/types";
import authenticateAdmin from "./main/auth/authHelpers/admin";
import UserModel, { UserDocument } from "./main/models/schemas/User";

dotenv.config()

const app: Express = express();

app.use(express.json());

// app.use('/trial',authenticateUser)

app.use("/api", userRouter);
app.get("/api/trial", authenticateAdmin, async(req: URequest, res: UResponse) => {
  const user = await UserModel.findOne({ username: req.user.payload });
  console.log(user?.isAdmin);
})


app.listen(process.env.PORT, () => {
  const dbString = process.env.DB_STRING as string;
  invokeDB(dbString);
  return console.log(
    `Express is  at http://localhost:${process.env.PORT}`
  );
});
