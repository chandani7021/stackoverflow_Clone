import express from "express";
const router = express.Router();

import { checkout, paymentVerification } from "../controllers/Payment.js";

// Id created by razorpay
router.post("/checkout", checkout);
router.post("/verification", paymentVerification);

router.get("/geykey", (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});
export default router;