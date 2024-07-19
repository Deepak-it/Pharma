import { NextResponse } from 'next/server';
import connectToDb from '../../../../db';
import { ObjectId } from 'mongodb';

export async function DELETE(request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
    }

    const db = await connectToDb();
    const collection = db.collection('products');
    
    await collection.deleteOne({ _id: new ObjectId(productId) });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
