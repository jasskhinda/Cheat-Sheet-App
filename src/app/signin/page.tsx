'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function SignInPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-16">
      <div className="w-full max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Cheat Sheet App"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isSignUp ? 'Create an Account' : 'Sign in to Cheat Sheet'}
          </h1>
          <p className="text-gray-500 mt-2">
            {isSignUp
              ? 'Join the community of sports betting enthusiasts.'
              : 'Welcome back! Enter your details below.'}
          </p>
        </div>

        {/* Form */}
        <div className="border border-gray-200 rounded-xl p-6">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  I want to
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600">
                  <option value="subscriber">Follow Handicappers (Subscriber)</option>
                  <option value="handicapper">Become a Handicapper</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
