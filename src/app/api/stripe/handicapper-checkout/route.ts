import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICES } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

// Handicapper checkout — $20/mo platform fee
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Verify user is a handicapper
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email, full_name, role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'handicapper') {
      return NextResponse.json({ error: 'Not a handicapper' }, { status: 403 });
    }

    // Get or create Stripe customer
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

    const origin = request.headers.get('origin') || 'https://cheatsheet.live';

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          price: PRICES.HANDICAPPER_MONTHLY,
          quantity: 1,
        },
      ],
      metadata: {
        type: 'handicapper_fee',
        user_id: user.id,
      },
      subscription_data: {
        metadata: {
          type: 'handicapper_fee',
          user_id: user.id,
        },
        description: 'Cheat Sheet Handicapper Platform Fee',
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Handicapper checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
