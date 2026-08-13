import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from './lib/auth';
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

  const user = await getCurrentUser();
  console.log(user, 'user')
  if (!user) { 
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }
  

  console.log(request)

  return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: '/',
}