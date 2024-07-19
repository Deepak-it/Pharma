// src/app/api/fetchCategories/route.js
import connectToDb from "../../../../db";
import { NextResponse } from 'next/server';


async function getCategories() {
  try {
    const database = await connectToDb();
    const collection = database.collection('categories');
    const result = await collection.find({}).toArray();
    console.log(result)
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch categories');
  }
}

export async function GET(request) {
  try {
    const categories = await getCategories();
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
