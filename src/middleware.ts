import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const hostname = request.headers.get('host') || '';
  const isAdminDomain = hostname.startsWith('admin.');

  // === ADMIN DOMAIN ROUTING ===
  if (isAdminDomain) {
    // On admin domain, only allow /admin routes and /signin
    if (!request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/signin') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }

    // Require auth for admin
    if (request.nextUrl.pathname.startsWith('/admin') && !user) {
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }

    // Redirect signed-in users from signin to admin
    if (request.nextUrl.pathname === '/signin' && user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  // === MAIN DOMAIN ROUTING ===
  // Block /admin on main domain - redirect to admin subdomain
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminUrl = new URL(request.nextUrl.pathname, `https://admin.cheatsheet.live`);
    return NextResponse.redirect(adminUrl);
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  // Protect feed route
  if (request.nextUrl.pathname.startsWith('/feed') && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  // Redirect signed-in users away from signin
  if (request.nextUrl.pathname === '/signin' && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.png).*)'],
};
