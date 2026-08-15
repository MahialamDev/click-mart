// client logout
export async function logoutUser() {
  const cookieStore = await cookies();

  // Own JWT authentication
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  // NextAuth
  cookieStore.delete("next-auth.session-token");
  cookieStore.delete("__Secure-next-auth.session-token");

  cookieStore.delete("next-auth.callback-url");
  cookieStore.delete("__Secure-next-auth.callback-url");

  cookieStore.delete("next-auth.csrf-token");
  cookieStore.delete("__Host-next-auth.csrf-token");
}
  