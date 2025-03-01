import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "~/db";
import { signature } from "~/db/schema";

interface Signature {
  id: string;
  userId: string;
  image: string;
}

export async function GET(request: Request,
  { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const signatures: Signature[] = await db.select().from(signature).where(eq(signature.userId, id));

  return NextResponse.json(signatures);
}