
import express, { Express } from "express";
import dotenv from "dotenv";
import invokeDB from "./main/db/setupDb";


import userRouter from "./main/routes/userRoutes";

dotenv.config()

const app: Express = express();

app.use(express.json());

app.use("/api", userRouter);



app.listen(process.env.PORT, () => {
  const dbString = process.env.DB_STRING as string;
  invokeDB(dbString);
  return console.log(
    `Express is  at http://localhost:${process.env.PORT}`
  );
});
