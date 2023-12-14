import Stripe from "stripe";
import dotenv from "dotenv";
import { URequest, UResponse } from "../types";
import paymentRequest from "./paymentTypes";
dotenv.config();
const secret: string ="sk_test_51OLDreLE8GuA8PCg97K9QIjKnMEJ2r1Xvjxsd2vjPwNB8ly6OJK0cnyIFN3oFHzjXxbH6Tdn6en5UTCdWm50l1f1004LYtea0B";
const stripe = new Stripe(secret);

const payment = async (req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        // const userId = req.user;
        const paymentObject: paymentRequest = req.body as paymentRequest;
        
        const createIntent = await stripe.paymentIntents.create(paymentObject);
        return res.json({ cliend_secret:createIntent.client_secret});
    }
    catch (err) {
        return res.json({
            err,
            message:"Internal Server Error!"
        })
    }
    
}

export {payment};