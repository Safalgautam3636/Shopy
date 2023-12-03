import express, { Express } from "express";
import dotenv from "dotenv";
import invokeDB from "./main/db/setupDb";
import userRouter from "./main/routes/userRoutes";
import productRoute from "./main/routes/productRoutes";
import bodyParser from "body-parser"
import orderRouter from "./main/routes/orderRoutes";

dotenv.config()

const app: Express = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/",userRouter);
app.use('/api/', productRoute);
app.use("/api/",orderRouter);



app.listen(process.env.PORT, () => {
  const dbString = process.env.DB_STRING as string;
  invokeDB(dbString);
  return console.log(
    `Express is  at http://localhost:${process.env.PORT}`
  );
});
