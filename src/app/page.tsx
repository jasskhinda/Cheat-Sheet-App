import Image from "next/image";
import Link from "next/link";
import { Zap, TrendingUp, BarChart3, QrCode, Search } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real Time Updates",
    description:
      "Don't miss a beat. Odds change in real time, make sure your notifications do too.",
  },
  {
    icon: TrendingUp,
    title: "Skilled Projections",
    description:
      "Follow projections from a wide range of handicappers so you give yourself the best odds to win.",
  },
  {
    icon: BarChart3,
    title: "Handicapper Standings",
    description:
      "Let us show you where your handicappers match up against the world.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.png"
              alt="Cheat Sheet App"
              width={100}
              height={100}
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Cheat Sheet!
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Where sports betting aficionados share valuable tips to boost your success.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link href="/connect" className="btn-outline">
              Connect to a Handicapper
            </Link>
            <Link href="/become" className="btn-outline">
              Become a Handicapper
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-divider mb-10" />
          <div className="flex items-center justify-center gap-16 sm:gap-24">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Handicapper #
              </h2>
            </div>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Subscriber #
              </h2>
            </div>
          </div>
          <div className="section-divider mt-10" />
        </div>
      </section>

      {/* Features Section - Everything You Need to Win */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Everything You Need to Win!
            </h2>
            <p className="text-gray-600">
              Professional-grade tools and insights that were once only available to sharks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-200 bg-white card-hover text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect to a Handicapper Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-divider mb-12" />

          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Connect to a Handicapper
            </h2>
            <p className="text-gray-600 mb-4">
              Join a community that shares valuable tips and data all in one place to increase your odds.
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              Follow experienced sports betting handicappers to increase your success with confidence. Get notifications in real time to make sure you&apos;re getting the best odds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link href="/connect" className="btn-outline">
                <QrCode className="w-5 h-5 mr-3" />
                Scan QR Code
              </Link>
              <Link href="/connect" className="btn-outline">
                <Search className="w-5 h-5 mr-3" />
                Search Our Site
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Handicapper Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-divider mb-12" />

          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Become a Handicapper
            </h2>
            <p className="text-gray-600 mb-4">
              Do you have strategies, predictions, and insights to sports betting that you&apos;d like to share with the world.
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              Invest in yourself by using the tools Cheat Sheet gives you to not only operate your own network but connect to your followers in a big way. Utilize your back office features to keep track of your stats, build a following with marketing, and see how you rank with other handicappers around the world.
            </p>

            <p className="text-lg font-medium text-gray-900 mb-4">
              To Become a Handicapper
            </p>
            <Link href="/become" className="btn-outline">
              Click Here
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
