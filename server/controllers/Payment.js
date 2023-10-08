import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
import { Payment } from "../models/Payment.js";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const checkout = async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };

    try {
        const order = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("Something Went Wrong !!");
    }
};

export const paymentVerification = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(body.toString())
            .digest("hex");

        // Check Is Authenticate or not
        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            res.redirect(
                `https://stack-overflow-clone-by-chandani.netlify.app/paymentsuccess?reference=${razorpay_payment_id}`
                //`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
            );
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Something Went Wrong !!");
    }
};