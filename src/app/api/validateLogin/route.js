// src/app/api/login/route.js
import connectToDb from "../../../../db";
import { NextResponse } from 'next/server';

async function validateLogin(username, password) {
  try {
    const database = await connectToDb();
    const collection = database.collection('users');

    // Check if user with given username exists
    const user = await collection.findOne({ username });

    if (!user) {
      return { error: 'Username not found' };
    }

    // Check if password matches
    if (user.password !== password) {
      return { error: 'Incorrect password' };
    }

    return { message: 'Login successful', user };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to validate login');
  }
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const result = await validateLogin(username, password);

    if (result.error) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ message: result.message, user: result.user }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error occurred while logging in' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
