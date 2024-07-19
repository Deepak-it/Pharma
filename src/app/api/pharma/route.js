// src/app/api/hello/route.js
import { NextResponse } from "next/server";
import connectToDb from "../../../../db";



export async function POST(request) {

    const db = await connectToDb();
    const collection = db.collection('products');
    const data = await request.json();


    try {
        await collection.insertOne(data);
        return new NextResponse(JSON.stringify({ message: 'Product saved successfully', data }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error inserting document', error);
        return new NextResponse(JSON.stringify({ message: 'Error saving product', error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
  