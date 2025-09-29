// app/api/admin/download/route.ts
import { NextResponse } from "next/server";
import connectPromise from "@/lib/mongodb";
import Visitor from "@/models/Visitor";

function isAdmin(req: Request){
  const cookie = req.headers.get("cookie") || "";
  return cookie.split(";").map(s=>s.trim()).some(kv=>kv==="admin_auth=1");
}

export async function GET(req: Request) {
  if (!isAdmin(req)) return new Response("Unauthorized", { status: 401 });
  await connectPromise;
  const rows = await Visitor.find().sort({ receivedAt: -1 }).lean();
  return NextResponse.json(rows);
}
