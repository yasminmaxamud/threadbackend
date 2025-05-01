import express from "express";
import { createPaymentIntent } from "../controllers/paymentController";
import { authenticate } from "../middlewares/authMiddleware";
const router = express.Router();
router.post("/", authenticate, createPaymentIntent);
export default router;
