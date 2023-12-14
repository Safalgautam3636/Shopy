import express, { Express } from "express";
import dotenv from "dotenv";
import invokeDB from "./main/db/setupDb";
import userRouter from "./main/routes/userRoutes";
import productRoute from "./main/routes/productRoutes";
import bodyParser from "body-parser";
import orderRouter from "./main/routes/orderRoutes";
import cors from "cors";
import paymentRouter from "./main/routes/paymentRoutes";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.path);
  if (Object.keys(req.body).length !== 0) {
    console.log("    Body:", req.body);
  }
  next();
});

app.use("/api/", userRouter);
app.use("/api/", productRoute);
app.use("/api/", orderRouter);
app.use("/api/", paymentRouter);

app.listen(process.env.PORT, () => {
  const dbString = process.env.DB_STRING as string;
  invokeDB(dbString);
  return console.log(`Express is  at http://localhost:${process.env.PORT}`);
});
