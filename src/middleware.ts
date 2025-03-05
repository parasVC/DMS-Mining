import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const session = await auth()

  const { pathname } = req.nextUrl;

  if (!session?.session_id) {
    
    return NextResponse.redirect(new URL("/auth/login", req.url)); // Redirect to login if not authenticated
  }

  
  const role = session.user_type as string; // Ensure roleType exists

  // Define dashboards for each role
  // const dashboardRoutes: Record<string, string> = {
  //   admin: "/admin/dashboard",
  //   client: "/university/dashboard",
  //   student: "/student/dashboard",
  // };
  //change route to dashboard when it will ready
  const dashboardRoutes: Record<string, string> = {
    admin: "/admin/university",
    client: "/university/student",
    student: "/student/dashboard",
  };

  const userDashboard = dashboardRoutes[role] || "/";
  

  //Redirect users from `/` to their dashboard
  if (pathname === "/") {
    return NextResponse.redirect(new URL(userDashboard, req.url));
  }

  //Restrict access and redirect unauthorized users
  const protectedRoutes: Record<string, string[]> = {
    admin: ["/admin"],
    client: ["/university"],
    student: ["/student"],
  };

  const allowedRoutes = protectedRoutes[role] || [];
  if (!allowedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(userDashboard, req.url)); // Redirect unauthorized users
  }

  return NextResponse.next();
}

// Apply middleware to relevant routes, including `/`
export const config = {
  matcher: ["/", "/admin/:path*", "/university/:path*", "/student/:path*"],
};
