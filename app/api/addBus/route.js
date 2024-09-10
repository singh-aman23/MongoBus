import connectMongoDB from "@/lib/mongodb";
import Bus from "@/model/model";
import { NextResponse } from "next/server";

export async function POST(req){
    const { bus_number, starting_location, ending_location} = await req.json();
    await connectMongoDB();
    await Bus.create({bus_number, starting_location, ending_location});
    return NextResponse.json({message : "Bus added"}, {status : 201});
}