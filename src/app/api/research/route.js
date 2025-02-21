import { connectDB } from "@/utils/db.connect";
import Research from "@/models/Research";
import { NextResponse } from "next/server";

//  GET all research 
export async function GET() {
    try {
        await connectDB();
        const researchItems = await Research.find();
        return NextResponse.json(researchItems, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error Fetching Research Data" }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        const newResearch = new Research(body);
        await newResearch.save();

        return NextResponse.json({ message: "New Research Added", newResearch }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid Research Data" }, { status: 400 });
    }
}
