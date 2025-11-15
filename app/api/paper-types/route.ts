import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PaperType from "@/models/PaperType";

export async function GET() {
  await connectDB();
  const list = await PaperType.find().sort({ name: 1 });
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  await connectDB();
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  const item = await PaperType.create({ name });
  return NextResponse.json(item, { status: 201 });
}
