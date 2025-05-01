
import { Request, Response } from "express";
import stripe from "../config/stripe";

// POST /api/createPaymentIntent
export const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount, tailorStripeId } = req.body;

  if (!amount || !tailorStripeId) {
    return res.status(400).json({ error: "Missing amount or tailorStripeId" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
      automatic_payment_methods: { enabled: true },
      application_fee_amount: Math.round(amount * 0.30), // 30% to ThreadMe
      transfer_data: {
        destination: tailorStripeId, // Tailor's Stripe account ID
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Payment creation failed" });
  }
};
