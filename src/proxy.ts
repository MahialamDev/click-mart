import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./lib/auth";

// This function can be marked `async` if using `await` inside

const adminRoutes = ["/about", "/dashboard"];
export async function proxy(request: NextRequest) {
  const user = await getCurrentUser();
  const pathname = request.nextUrl.pathname;


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
  matcher: ["/dashboard/:path*", "/about/:path*"],
};
