// src/app/api/fetchCategories/route.js
import connectToDb from "../../../../db";
import { NextResponse } from 'next/server';

async function getProducts() {
  try {
    const database = await connectToDb();
    const collection = database.collection('products');
    const result = await collection.find({}).toArray();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch products');
  }
}

export async function GET(request) {
  try {
    const products = await getProducts();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
      },
    });
  }
}
