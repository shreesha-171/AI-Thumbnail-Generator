import Replicate from "replicate";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title: string = body.title;

    const prompt = `
      YouTube thumbnail,
      ultra high quality,
      big bold text "${title}",
      vibrant colors,
      dramatic lighting,
      highly clickable,
      16:9 aspect ratio
    `;

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: prompt,
          aspect_ratio: "16:9",
        },
      }
    );

    // Replicate sometimes returns array or string
    const imageUrl =
      Array.isArray(output) ? output[0] : (output as any);

    return NextResponse.json({ image: imageUrl });
  } catch (error) {
    console.error("Replicate Error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
