import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await cloudinary.uploader.upload_stream(
      { folder: "loveunsent-products" },
      (error, result) => {
        if (error) throw new Error("Cloudinary upload failed");
        return result;
      }
    );

    // FIX for upload_stream (Node API)
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "loveunsent-products" },
        (error, result) => {
          if (error) return reject(error);
          resolve(NextResponse.json(result));
        }
      );

      stream.end(buffer);
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
