import express from "express";
import { createBooking, getBookings } from "../controllers/bookingController";
import { authenticate } from "../middlewares/authMiddleware";
const router = express.Router();
router.post("/", authenticate, createBooking);
router.get("/", authenticate, getBookings);
export default router;
