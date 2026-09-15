-- Stripe integration migration
-- Run this in Supabase SQL Editor after the main schema and admin migration

-- Add Stripe customer ID to profiles (every paying user gets a Stripe customer)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Add Stripe subscription ID to track handicapper's $20/mo platform fee
ALTER TABLE handicappers ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
ALTER TABLE handicappers ADD COLUMN IF NOT EXISTS stripe_status TEXT DEFAULT 'inactive' CHECK (stripe_status IN ('active', 'inactive', 'past_due', 'cancelled'));

-- Add Stripe subscription ID to track subscriber's $5/mo follow subscription
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

-- Index for quick Stripe customer lookups
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_sub ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_handicappers_stripe_sub ON handicappers(stripe_subscription_id);

-- RPC functions for atomic follower count updates (used by webhook)
CREATE OR REPLACE FUNCTION increment_followers(h_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE handicappers SET followers_count = followers_count + 1 WHERE id = h_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_followers(h_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE handicappers SET followers_count = GREATEST(followers_count - 1, 0) WHERE id = h_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
