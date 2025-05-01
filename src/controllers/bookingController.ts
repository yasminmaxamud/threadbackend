
import { Request, Response } from "express";
import { db } from "../config/firebase";

export const createBooking = async (req: Request, res: Response) => {
  const { customerId, tailorId, service, scheduledDate } = req.body;
  try {
    const bookingRef = db.collection("bookings").doc();
    await bookingRef.set({
      customerId,
      tailorId,
      service,
      scheduledDate,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ message: "Booking created", id: bookingRef.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  const userId = (req as any).uid;
  try {
    const snapshot = await db.collection("bookings").where("customerId", "==", userId).get();
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};
