import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data } = await supabase.auth.getClaims()
  const user = data?.claims
  const { pathname } = request.nextUrl

  // !PROTECTED ROUTES
  const userRoutes  = ['/dashboard', '/joinqueue', '/profile', '/settings']
  const staffRoutes = ['/staff/dashboard', '/staff/noshow', '/staff/profile', '/staff/settings']
  const adminRoutes = ['/admin']

  const isUserRoute  = userRoutes.some((r) => pathname.startsWith(r))
  const isStaffRoute = staffRoutes.some((r) => pathname.startsWith(r))
  const isAdminRoute = adminRoutes.some((r) => pathname.startsWith(r))

  const redirect = (path: string) => {
    const url = request.nextUrl.clone()
    url.pathname = path
    return NextResponse.redirect(url)
  }

  // !NOT LOGGED IN → LOGIN
  if (!user && (isUserRoute || isStaffRoute || isAdminRoute)) {
    return redirect('/auth/login')
  }

  if (user) {
    const role = user.user_metadata?.role as string | undefined

    // WRONG ROLE CHECKS

    // staff/admin trying to access user routes → their dashboard
    if (isUserRoute && (role === 'staff' || role === 'admin')) {
      if (role === 'admin') return redirect('/admin')
      return redirect('/staff/dashboard')
    }

    // user/admin trying to access staff routes → login
    if (isStaffRoute && role !== 'staff' && role !== 'admin') {
      return redirect('/auth/login')
    }

    // non-admin trying to access admin routes → login
    if (isAdminRoute && role !== 'admin') {
      return redirect('/auth/login')
    }

    // ALREADY LOGGED IN → AUTH PAGES
    if (pathname.startsWith('/auth')) {
      if (role === 'admin') return redirect('/admin')
      if (role === 'staff') return redirect('/staff/dashboard')
      return redirect('/dashboard')
    }
  }

  return supabaseResponse
}