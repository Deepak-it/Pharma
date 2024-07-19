import connectToDb from '../../../../db';
import { ObjectId } from 'mongodb';

export async function PUT(req) {
  try {
    const { productId, updates } = await req.json();

    if (!productId || !updates) {
      return new Response(JSON.stringify({ message: 'Product ID and updates are required' }), {
        status: 400,
      });
    }

    const db = await connectToDb();
    const collection = db.collection('products');
    await collection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: updates }
    );

    return new Response(JSON.stringify({ message: 'Product updated successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
