import { NextResponse } from "next/server";
import { db } from "~/db";
import { signature } from "~/db/schema";

export async function POST(request: Request) {
  try { 
    // Parse the request body
    const body: { userId: string, image: string } = await request.json();
    const { userId, image } = body;
    
    if (!userId || !image) {
      return NextResponse.json({ 
        success: false, 
        message: "Missing required fields" 
      }, { status: 400 });
    }
    
    // Insert into database using Drizzle
    await db.insert(signature).values({
      userId: userId,
      image: image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Signature saved successfully" 
    });
  } catch (error) {
    console.error("Error saving signature:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Error saving signature", 
      error: (error as Error).message 
    }, { status: 500 });
  }
}
