// app/api/collect/route.ts
import { NextResponse } from "next/server";
import connectPromise from "@/lib/mongodb";
import { Visitor } from "@/models/Visitor";

function getClientIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    await connectPromise;
    const clientIp = getClientIp(request);
    const doc = await (Visitor as any).create({
  clientIp,
  userAgent: payload.userAgent || "",
  platform: payload.platform || "",
  languages: payload.languages || "",
  timezone: payload.timezone || "",
  screen: payload.screen || "",
  colorDepth: payload.colorDepth || null,
  pixelRatio: payload.pixelRatio || null,
  fingerprint: payload.fingerprint || "",
  localIPs: payload.localIPs || [],
  // new fields
  locationConsent: !!payload.locationConsent,
  latitude: typeof payload.latitude === "number" ? payload.latitude : undefined,
  longitude: typeof payload.longitude === "number" ? payload.longitude : undefined,
  latitude_rounded: typeof payload.latitude_rounded === "number" ? payload.latitude_rounded : undefined,
  longitude_rounded: typeof payload.longitude_rounded === "number" ? payload.longitude_rounded : undefined,
  accuracy: typeof payload.accuracy === "number" ? payload.accuracy : undefined,
  // keep full raw record too
  raw: payload
});

    return NextResponse.json({ ok: true, id: doc._id });
  } catch (e: any) {
    console.error("collect error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
