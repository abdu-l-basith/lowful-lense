// app/api/admin/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json().catch(()=>({}));
  if (password && password === process.env.ADMIN_PASS) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set({ name: "admin_auth", value: "1", httpOnly: true, path: "/", maxAge: 60*60*24 });
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
