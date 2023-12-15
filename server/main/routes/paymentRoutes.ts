import authenticateUser from "../auth/authHelpers/auth";
import { Router } from "express";
import { payment } from "../payment/payment";

const paymentRouter: Router = Router();

paymentRouter.post("/payment/", authenticateUser, payment);

export default paymentRouter;
