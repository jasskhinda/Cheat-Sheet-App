import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] border-t border-[#30363d] py-12">
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
              <span className="font-bold text-lg">
                <span className="text-white">Cheat Sheet</span>
                <span className="text-[#1a90ff]"> App</span>
              </span>
            </Link>
            <p className="text-[#8b949e] text-sm max-w-md">
              The ultimate fantasy sports companion. Get expert rankings,
              projections, and build winning lineups with our advanced tools.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-[#8b949e]">
              <li><Link href="/cheatsheet" className="hover:text-white transition-colors">Cheat Sheets</Link></li>
              <li><Link href="/lineup" className="hover:text-white transition-colors">Lineup Builder</Link></li>
              <li><Link href="/rankings" className="hover:text-white transition-colors">Rankings</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Projections</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-[#8b949e]">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#30363d] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#8b949e]">
            © 2024 Cheat Sheet App. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-[#8b949e]">
            <span>Made for fantasy sports enthusiasts</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
