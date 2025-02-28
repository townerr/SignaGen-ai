import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

interface RequestData {
  prompt: string;
}

export async function POST(req: NextRequest) {
  const data = await req.json() as RequestData;

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set."
    );
  }

  const prediction = await replicate.predictions.create({
    model: 'black-forest-labs/flux-schnell',
    input: { prompt: data.prompt }
  });

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return new Response(
    JSON.stringify(prediction),
    { status: 201 }
  );
}