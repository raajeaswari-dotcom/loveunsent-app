import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;

  const order = await Order.findById(id);
  return NextResponse.json(order);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;

  const data = await req.json();
  const updated = await Order.findByIdAndUpdate(id, data, { new: true });

  return NextResponse.json(updated);
}
