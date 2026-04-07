import Link from 'next/link';
import { BarChart3, Users, TrendingUp, Megaphone, Shield, DollarSign } from 'lucide-react';

const benefits = [
  {
    icon: BarChart3,
    title: "Track Your Stats",
    description: "Keep a detailed record of your picks, win rates, and performance over time with our built-in analytics.",
  },
  {
    icon: Users,
    title: "Build a Following",
    description: "Grow your subscriber base and connect with bettors who value your insights and expertise.",
  },
  {
    icon: TrendingUp,
    title: "See Your Rankings",
    description: "See how you rank against other handicappers around the world and climb the leaderboard.",
  },
  {
    icon: Megaphone,
    title: "Marketing Tools",
    description: "Promote yourself with built-in tools. Share your profile, QR code, and track record to attract new followers.",
  },
  {
    icon: DollarSign,
    title: "Earn Revenue",
    description: "Earn money from your subscribers. You keep the majority of every subscription your followers pay.",
  },
  {
    icon: Shield,
    title: "Your Business, Your Rules",
    description: "You're running your own business. We're just the platform that connects you with the world.",
  },
];

export default function BecomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Become a Handicapper
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Do you have strategies, predictions, and insights to sports betting that you&apos;d like to share with the world.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Invest in yourself by using the tools Cheat Sheet gives you to not only operate your own network but connect to your followers in a big way. Utilize your back office features to keep track of your stats, build a following with marketing, and see how you rank with other handicappers around the world.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-200 bg-white card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="section-divider mb-12" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Simple, Affordable Pricing
          </h2>
          <p className="text-gray-600 mb-8">
            For just $20/month, you get access to all the tools you need to run your handicapping business.
          </p>

          <div className="p-8 rounded-2xl border-2 border-gray-900 inline-block">
            <div className="text-4xl font-bold text-gray-900 mb-1">$20</div>
            <div className="text-gray-500 mb-6">per month</div>
            <ul className="text-left text-gray-600 space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">&#10003;</span>
                Full back office dashboard
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">&#10003;</span>
                Unlimited posts &amp; picks
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">&#10003;</span>
                Stats tracking &amp; analytics
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">&#10003;</span>
                Marketing &amp; promotion tools
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">&#10003;</span>
                Keep $3 of every $5 subscriber fee
              </li>
            </ul>
            <Link href="/signin" className="btn-outline !bg-gray-900 !text-white !border-gray-900 hover:!bg-gray-800">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="section-divider mb-12" />
          <p className="text-lg font-medium text-gray-900 mb-4">
            To Become a Handicapper
          </p>
          <Link href="/signin" className="btn-outline">
            Click Here
          </Link>
        </div>
      </section>
    </div>
  );
}
