import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function GET() {
  await connectDB();
  const list = await Category.find().sort({ name: 1 });
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  await connectDB();
  const { name, parent } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  const item = await Category.create({ name, parent });
  return NextResponse.json(item, { status: 201 });
}
