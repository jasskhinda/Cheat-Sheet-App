-- Cheat Sheet App Database Schema
-- Run this in your Supabase SQL Editor

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'subscriber' CHECK (role IN ('handicapper', 'subscriber')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Handicapper profiles
CREATE TABLE handicappers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT DEFAULT '',
  sport TEXT NOT NULL DEFAULT 'NFL',
  total_picks INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  pushes INTEGER DEFAULT 0,
  win_rate DECIMAL(5,2) DEFAULT 0,
  followers_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  subscription_price DECIMAL(10,2) DEFAULT 5.00,
  affiliate_platform TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Picks posted by handicappers
CREATE TABLE picks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  handicapper_id UUID REFERENCES handicappers(id) ON DELETE CASCADE NOT NULL,
  sport TEXT NOT NULL DEFAULT 'NFL',
  league TEXT NOT NULL DEFAULT 'NFL',
  game TEXT NOT NULL,
  pick_type TEXT NOT NULL CHECK (pick_type IN ('spread', 'moneyline', 'over_under', 'prop', 'parlay')),
  pick_detail TEXT NOT NULL,
  odds TEXT NOT NULL,
  confidence TEXT NOT NULL DEFAULT 'medium' CHECK (confidence IN ('low', 'medium', 'high', 'lock')),
  result TEXT DEFAULT 'pending' CHECK (result IN ('win', 'loss', 'push', 'pending')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions (subscriber follows handicapper)
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subscriber_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  handicapper_id UUID REFERENCES handicappers(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(subscriber_id, handicapper_id)
);

-- Notifications
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE handicappers ENABLE ROW LEVEL SECURITY;
ALTER TABLE picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all profiles, update own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Handicappers: everyone can read, owner can update
CREATE POLICY "Handicapper profiles are viewable by everyone" ON handicappers FOR SELECT USING (true);
CREATE POLICY "Handicappers can update own profile" ON handicappers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Handicappers can insert own profile" ON handicappers FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Picks: everyone can read, handicapper can manage own
CREATE POLICY "Picks are viewable by everyone" ON picks FOR SELECT USING (true);
CREATE POLICY "Handicappers can insert own picks" ON picks FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM handicappers WHERE id = handicapper_id AND user_id = auth.uid())
);
CREATE POLICY "Handicappers can update own picks" ON picks FOR UPDATE USING (
  EXISTS (SELECT 1 FROM handicappers WHERE id = handicapper_id AND user_id = auth.uid())
);
CREATE POLICY "Handicappers can delete own picks" ON picks FOR DELETE USING (
  EXISTS (SELECT 1 FROM handicappers WHERE id = handicapper_id AND user_id = auth.uid())
);

-- Subscriptions: users can manage own
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = subscriber_id);
CREATE POLICY "Handicappers can view their subscribers" ON subscriptions FOR SELECT USING (
  EXISTS (SELECT 1 FROM handicappers WHERE id = handicapper_id AND user_id = auth.uid())
);
CREATE POLICY "Users can subscribe" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = subscriber_id);
CREATE POLICY "Users can unsubscribe" ON subscriptions FOR DELETE USING (auth.uid() = subscriber_id);

-- Notifications: users can manage own
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'subscriber')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creating profile
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to auto-create handicapper profile when role is handicapper
CREATE OR REPLACE FUNCTION public.handle_new_handicapper()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'handicapper' THEN
    INSERT INTO public.handicappers (user_id, display_name, sport)
    VALUES (NEW.id, NEW.full_name, 'NFL')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_profile_role_set
  AFTER INSERT OR UPDATE OF role ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_handicapper();
