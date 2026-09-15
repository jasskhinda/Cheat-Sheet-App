import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Use service role to bypass RLS in webhook handlers
function getAdminClient() {
  return createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = getAdminClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(supabase, session);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(supabase, subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(supabase, subscription);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(supabase, invoice);
        break;
      }
    }
  } catch (error) {
    console.error(`Error handling ${event.type}:`, error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCheckoutComplete(supabase: any, session: Stripe.Checkout.Session) {
  const metadata = session.metadata;
  if (!metadata) return;

  if (metadata.type === 'subscriber_follow') {
    // Create subscription record in DB
    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        subscriber_id: metadata.subscriber_id,
        handicapper_id: metadata.handicapper_id,
        status: 'active',
        stripe_subscription_id: session.subscription as string,
      }, {
        onConflict: 'subscriber_id,handicapper_id',
      });

    if (error) {
      console.error('Failed to create subscription:', error);
      return;
    }

    // Increment follower count
    await supabase.rpc('increment_followers', { h_id: metadata.handicapper_id });
  }

  if (metadata.type === 'handicapper_fee') {
    // Activate handicapper account
    const { data: handicapper } = await supabase
      .from('handicappers')
      .select('id')
      .eq('user_id', metadata.user_id)
      .single();

    if (handicapper) {
      await supabase
        .from('handicappers')
        .update({
          stripe_subscription_id: session.subscription as string,
          stripe_status: 'active',
        })
        .eq('id', handicapper.id);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionUpdate(supabase: any, subscription: Stripe.Subscription) {
  const metadata = subscription.metadata;
  const stripeStatus = subscription.status;

  if (metadata.type === 'subscriber_follow') {
    const status = stripeStatus === 'active' ? 'active' :
                   stripeStatus === 'past_due' ? 'active' : 'expired';

    await supabase
      .from('subscriptions')
      .update({ status })
      .eq('stripe_subscription_id', subscription.id);
  }

  if (metadata.type === 'handicapper_fee') {
    const dbStatus = stripeStatus === 'active' ? 'active' :
                     stripeStatus === 'past_due' ? 'past_due' : 'inactive';

    await supabase
      .from('handicappers')
      .update({ stripe_status: dbStatus })
      .eq('stripe_subscription_id', subscription.id);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionDeleted(supabase: any, subscription: Stripe.Subscription) {
  const metadata = subscription.metadata;

  if (metadata.type === 'subscriber_follow') {
    // Mark subscription as cancelled
    const { data: sub } = await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('stripe_subscription_id', subscription.id)
      .select('handicapper_id')
      .single();

    // Decrement follower count
    if (sub) {
      await supabase.rpc('decrement_followers', { h_id: sub.handicapper_id });
    }
  }

  if (metadata.type === 'handicapper_fee') {
    await supabase
      .from('handicappers')
      .update({ stripe_status: 'cancelled' })
      .eq('stripe_subscription_id', subscription.id);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePaymentFailed(supabase: any, invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as unknown as { subscription: string | null }).subscription;
  if (!subscriptionId) return;

  // Fetch the subscription to check metadata
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const metadata = subscription.metadata;

  if (metadata.type === 'handicapper_fee') {
    await supabase
      .from('handicappers')
      .update({ stripe_status: 'past_due' })
      .eq('stripe_subscription_id', subscriptionId);
  }

  // Send notification to user
  const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (profile) {
    await supabase.from('notifications').insert({
      user_id: profile.id,
      title: 'Payment Failed',
      message: 'Your payment failed. Please update your payment method to continue your subscription.',
    });
  }
}
