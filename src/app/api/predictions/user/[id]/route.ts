import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/db";
import { signature } from "~/db/schema";

interface Signature {
  id: string;
  userId: string;
  image: string;
}

export async function GET(request: NextRequest,
  { params }: { params: { id: string } }) {
   params = await params;

  const signatures: Signature[] = await db.select().from(signature).where(eq(signature.userId, params.id));

  return NextResponse.json(signatures);
}