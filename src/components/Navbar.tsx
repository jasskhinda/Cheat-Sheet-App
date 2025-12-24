'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/cheatsheet', label: 'Cheat Sheet' },
  { href: '/lineup', label: 'Lineup Builder' },
  { href: '/rankings', label: 'Rankings' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/95 backdrop-blur-md border-b border-[#30363d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Cheat Sheet App"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-xl hidden sm:block">
              <span className="text-white">Cheat Sheet</span>
              <span className="text-[#1a90ff]"> App</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-[#1a90ff]/20 text-[#1a90ff]'
                    : 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Sport Selector */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d]">
              <span className="text-sm font-medium text-[#00d632]">NFL</span>
              <ChevronDown className="w-4 h-4 text-[#8b949e]" />
            </div>

            {/* Sign In Button */}
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a90ff] hover:bg-[#1a90ff]/80 text-white text-sm font-medium transition-colors">
              <User className="w-4 h-4" />
              Sign In
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#161b22] text-[#8b949e]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#30363d]">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-[#1a90ff]/20 text-[#1a90ff]'
                      : 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-lg bg-[#1a90ff] hover:bg-[#1a90ff]/80 text-white text-sm font-medium transition-colors">
                <User className="w-4 h-4" />
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
