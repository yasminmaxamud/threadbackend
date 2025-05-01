
import { Request, Response } from "express";
import { db } from "../config/firebase";

export const signupController = async (req: Request, res: Response) => {
  const { uid, email, name, role, location, phone } = req.body;
  try {
    await db.collection("users").doc(uid).set({ uid, email, name, role, location, phone });
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
};
