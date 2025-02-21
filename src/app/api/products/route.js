import Product from "@/models/Products";
import { connectDB } from "@/utils/db.connect";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        await connectDB();
        const products = await Product.find();

        return NextResponse.json(products, { status: 200 });

    } catch (error) {
        return NextResponse.json("Error Fetching products", { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        const newProduct = new Product(body);
        await newProduct.save();

        return NextResponse.json({ message: "New Product Created", newProduct }, { status: 200 });

    } catch (error) {
        return NextResponse.json("Error Creating New Product", { status: 500 });
    }
}
