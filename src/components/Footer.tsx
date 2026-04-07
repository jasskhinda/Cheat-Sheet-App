import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Cheat Sheet App"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-bold text-lg text-gray-900">
                Cheat Sheet App
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-md">
              Where sports betting aficionados share valuable tips to boost your success.
              Connect with top handicappers and take your game to the next level.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/connect" className="hover:text-gray-900 transition-colors">Find Handicappers</Link></li>
              <li><Link href="/become" className="hover:text-gray-900 transition-colors">Become a Handicapper</Link></li>
              <li><Link href="/featured" className="hover:text-gray-900 transition-colors">Featured</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition-colors">Rankings</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-gray-900 transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Cheat Sheet App. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Connecting handicappers with the world</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
