import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const prompt = `
      Generate a compelling SEO-optimized product description
      for a product titled: "${title}"
      
      Also extract 5 relevant tags (single words).
      
      Return JSON:
      {
        "description": "...",
        "tags": ["..."]
      }
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      }),
    });

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content;

    return NextResponse.json(JSON.parse(content));

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
