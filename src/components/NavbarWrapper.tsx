'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith('/dashboard') || pathname.startsWith('/feed');

  if (hideNavbar) return null;

  return (
    <>
      <Navbar />
      <div className="h-16" /> {/* Spacer for fixed navbar */}
    </>
  );
}
