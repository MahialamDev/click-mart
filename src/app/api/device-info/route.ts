import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();

  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");

  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    realIp ||
    "Unknown";

  return Response.json({
    ip,
  });
}