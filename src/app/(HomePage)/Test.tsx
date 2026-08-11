"use client";

import { useSession } from "next-auth/react";

export default function Test() {
  const { data: session, status } = useSession();

  console.log("status:", status);
  console.log("session:", session);

  return (
    <div>
      <p>Status: {status}</p>
      <p>{session?.user?.email}</p>
    </div>
  );
}