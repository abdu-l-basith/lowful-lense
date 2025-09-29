import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Address from "@/models/Address";

export async function POST(req: Request) {
  try {
    // dbConnect is a Promise, not a function
    await dbConnect;

    const body = await req.json();
    const newAddress = new Address(body);
    await newAddress.save();

    return NextResponse.json({ success: true, message: "Address saved!" });
  } catch (err: any) {
    console.error("❌ Error saving address:", err.message);
    return NextResponse.json(
      { success: false, message: "Error saving address", error: err.message },
      { status: 500 }
    );
  }
}
