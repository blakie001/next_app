import { connectDB } from "@/utils/db.connect";
import Research from "@/models/Research";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    try {
        await connectDB();
        const { id } = await context.params;

        const researchItem = await Research.findById(id);
        if (!researchItem) {
            return NextResponse.json({ error: "Research Not Found" }, { status: 404 });
        }

        return NextResponse.json(researchItem, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error Fetching Research" }, { status: 500 });
    }
}

export async function PUT(req, context) {
    try {
        await connectDB();
        const { id } = await context.params;

        const updatedData = await req.json();
        
        const updatedResearch = await Research.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedResearch) {
            return NextResponse.json({ error: "Research Not Found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Research Updated Successfully", updatedResearch }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error Updating Research" }, { status: 500 });
    }
}

export async function DELETE(req, context) {
    try {
        await connectDB();
        const { id } = await context.params;

        const deletedResearch = await Research.findByIdAndDelete(id);
        if (!deletedResearch) {
            return NextResponse.json({ error: "Research Not Found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Research Deleted" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error Deleting Research" }, { status: 500 });
    }
}
