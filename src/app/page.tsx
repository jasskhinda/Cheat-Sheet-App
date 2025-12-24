import Image from "next/image";
import Link from "next/link";
import { Trophy, TrendingUp, Zap, Target, Users, BarChart3, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Expert Projections",
    description: "Accurate player projections powered by advanced analytics and expert insights."
  },
  {
    icon: Target,
    title: "Lineup Optimizer",
    description: "Build optimal lineups with our smart optimizer that maximizes projected points."
  },
  {
    icon: BarChart3,
    title: "Tier Rankings",
    description: "Visual tier-based rankings help you identify the best value plays each week."
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Live injury updates, lineup changes, and breaking news to keep you ahead."
  },
  {
    icon: Users,
    title: "Multi-Platform Support",
    description: "Optimized lineups for DraftKings, FanDuel, and season-long leagues."
  },
  {
    icon: Trophy,
    title: "Win More",
    description: "Data-driven insights that give you the edge to dominate your leagues."
  }
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "89%", label: "Accuracy Rate" },
  { value: "$2M+", label: "Winnings Generated" },
  { value: "NFL", label: "Full Coverage" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a90ff]/20 via-transparent to-[#00d632]/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#1a90ff]/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a90ff]/10 border border-[#1a90ff]/30 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d632] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d632]"></span>
              </span>
              <span className="text-sm font-medium text-[#1a90ff]">NFL Week 16 Data Live</span>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/logo.png"
                alt="Cheat Sheet App"
                width={120}
                height={120}
                className="drop-shadow-2xl"
              />
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-white">Dominate Your</span>
              <br />
              <span className="gradient-text">Fantasy League</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#8b949e] max-w-2xl mx-auto mb-10">
              The ultimate cheat sheet for DFS and fantasy football.
              Expert projections, tier rankings, and lineup optimization
              to give you the winning edge.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/cheatsheet"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#1a90ff] hover:bg-[#1a90ff]/80 text-white font-semibold text-lg transition-all glow-blue"
              >
                View Cheat Sheet
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/lineup"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#161b22] hover:bg-[#21262d] text-white font-semibold text-lg border border-[#30363d] transition-colors"
              >
                Build Lineup
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-[#30363d] bg-[#161b22]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[#8b949e]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to Win
            </h2>
            <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
              Professional-grade tools and insights that were once only available to sharks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-[#161b22] border border-[#30363d] card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-[#1a90ff]/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#1a90ff]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#8b949e] text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#161b22]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
              Get from research to winning lineup in minutes, not hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Check the Cheat Sheet", desc: "View our expert rankings, projections, and tier breakdowns for every player." },
              { step: "02", title: "Build Your Lineup", desc: "Use our optimizer or manually craft your lineup with real-time salary tracking." },
              { step: "03", title: "Dominate & Win", desc: "Export your lineup directly to DraftKings or FanDuel and collect your winnings." },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-[#1a90ff]/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-[#8b949e]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-gradient-to-r from-[#1a90ff]/20 to-[#00d632]/20 border border-[#30363d] p-8 sm:p-12 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a90ff]/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Start Winning?
              </h2>
              <p className="text-lg text-[#8b949e] mb-8 max-w-xl mx-auto">
                Join thousands of fantasy players who use Cheat Sheet App to gain
                the competitive edge they need.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/cheatsheet"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00d632] hover:bg-[#00d632]/80 text-black font-semibold text-lg transition-all glow-green"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-[#8b949e]">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00d632]" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00d632]" />
                  Free tier available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
