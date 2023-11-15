
import express, { Express } from "express";

import dotenv from "dotenv";
dotenv.config()

const app:Express = express();



app.listen(process.env.PORT, () => {
  return console.log(
    `Express is  at http://localhost:${process.env.PORT}`
  );
});
