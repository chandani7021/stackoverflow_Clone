import express from "express";
const router = express.Router();

// all Work function
import { subscriptionType, validationCheck } from "../controllers/subscriptions.js";

// middleware

// Routes
router.patch("/verify", subscriptionType);
router.patch("/validity", validationCheck);

export default router;