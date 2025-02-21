import { connectDB } from "@/utils/db.connect";
import Product from "@/models/Products";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    try {
        await connectDB();
        const { id } = await context.params;

        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error Fetching Product" }, { status: 500 });
    }
}

export async function PUT(req, context) {
    try {
        await connectDB();
        const { id } = await context.params;

        const updatedData = await req.json();
        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        if (!product) {
            return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product Updated Successfully", product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error Updating Product" }, { status: 500 });
    }
}

export async function DELETE(req, context) {
    try {
        await connectDB();
        const { id } = await context.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return NextResponse.json({ message: "Product Not Found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product Deleted Successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error Deleting Product" }, { status: 500 });
    }
}
