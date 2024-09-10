import connectMongoDB from "@/lib/mongodb";
import Bus from "@/model/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const buses = await Bus.find();
  return NextResponse.json({ buses });
}

export async function POST(req) {
  const { startingLocation, finalLocation } = await req.json();
  if (!startingLocation || !finalLocation) {
    return NextResponse.json(
      { error: "Both starting and final locations are required" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();
    const buses = await Bus.find({
      starting_location: startingLocation.trim(),
      ending_location: finalLocation.trim(),
    });
    return NextResponse.json({ buses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching buses : ", error);
    return NextResponse.json(
      { error: "Error fetching Buses" },
      { status: 500 }
    );
  }
}
