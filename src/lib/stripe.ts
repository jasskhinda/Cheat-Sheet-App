import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Price IDs — create these in your Stripe Dashboard, then add IDs to .env.local
export const PRICES = {
  HANDICAPPER_MONTHLY: process.env.STRIPE_HANDICAPPER_PRICE_ID!,
  SUBSCRIBER_MONTHLY: process.env.STRIPE_SUBSCRIBER_PRICE_ID!,
};
