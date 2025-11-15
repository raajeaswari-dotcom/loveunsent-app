import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req: Request, { params }: any) {
  await connectDB();
  const order = await Order.findById(params.id);
  return NextResponse.json(order);
}

export async function PUT(req: Request, { params }: any) {
  await connectDB();
  const data = await req.json();

  const updated = await Order.findByIdAndUpdate(
    params.id,
    { status: data.status },
    { new: true }
  );

  return NextResponse.json(updated);
}
