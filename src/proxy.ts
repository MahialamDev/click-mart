import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./lib/auth";

// This function can be marked `async` if using `await` inside

const adminRoutes = [ "/dashboard"];
export async function proxy(request: NextRequest) {
  const user = await getCurrentUser();
  const pathname = request.nextUrl.pathname;

   // Logged-in user cannot access login/register
  if (
    user &&
    (pathname === "/login" || pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  if (adminRoutes.some((route) => pathname.startsWith(route))) { 
    if (!user) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set(
        "callbackUrl",
        request.nextUrl.pathname + request.nextUrl.search,
      );

      return NextResponse.redirect(loginUrl);
    }

  } 
 
  
    
  

 

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*", "/register/:path*" ],
};
