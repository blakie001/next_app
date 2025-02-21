import { connectDB } from "@/utils/db.connect";
import Service from "@/models/Services";
import { NextResponse } from "next/server";

// GET a single service
export async function GET(req, context) {
    try {
        await connectDB();
        const { id } = await context.params;

        const service = await Service.findById(id);
        if (!service) {
            return NextResponse.json({ error: "Service Not Found" }, { status: 404 });
        }

        return NextResponse.json(service, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error Fetching Service" }, { status: 500 });
    }
}

// UPDATE service
export async function PUT(req, context) {
    try {
        await connectDB();
        const { id } = await context.params;

        const updatedData = await req.json();
        
        const updatedService = await Service.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedService) {
            return NextResponse.json({ error: "Service Not Found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Service Updated Successfully", updatedService }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error Updating Service" }, { status: 500 });
    }
}

// DELETE service
export async function DELETE(req, context) {
    try {
        await connectDB();
        const { id } = await context.params;

        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return NextResponse.json({ error: "Service Not Found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Service Deleted" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error Deleting Service" }, { status: 500 });
    }
}
