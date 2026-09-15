import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICES } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

// Subscriber checkout — $5/mo to follow a handicapper
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { handicapperId } = await request.json();

    if (!handicapperId) {
      return NextResponse.json({ error: 'Missing handicapperId' }, { status: 400 });
    }

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email, full_name')
      .eq('id', user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile?.email || user.email,
        name: profile?.full_name || undefined,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id);
    }

    // Get handicapper display name for checkout description
    const { data: handicapper } = await supabase
      .from('handicappers')
      .select('display_name')
      .eq('id', handicapperId)
      .single();

    const origin = request.headers.get('origin') || 'https://cheatsheet.live';

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          price: PRICES.SUBSCRIBER_MONTHLY,
          quantity: 1,
        },
      ],
      metadata: {
        type: 'subscriber_follow',
        subscriber_id: user.id,
        handicapper_id: handicapperId,
      },
      subscription_data: {
        metadata: {
          type: 'subscriber_follow',
          subscriber_id: user.id,
          handicapper_id: handicapperId,
        },
        description: `Following ${handicapper?.display_name || 'handicapper'}`,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/handicapper/${handicapperId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
