import { connectDB } from "@/utils/db.connect";
import Service from "@/models/Services";
import { NextResponse } from "next/server";

// get all services :
export async function GET() {
    try {
        await connectDB();
        const services = await Service.find();
        return NextResponse.json(services, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}


// post new service :
export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        console.log(body);

        const newService = new Service(body);
        await newService.save();

        return NextResponse.json(
            {
                message: "New Service Added",
                newService,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid Service Data. Please enter correct: name, description, sub_services[]" },
            { status: 400 }
        );
    }
}


