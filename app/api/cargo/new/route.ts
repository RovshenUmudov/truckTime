import { connectMongoDB } from '@/mongoDB/mongodb';
import User from '@/mongoDB/models/user';
import { decodedJWT } from '@/utils';

export async function POST(req: Request) {
  try {
    const token = req.headers.get('Authorization');

    if (!token) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    const jwtToken = token.replace('Bearer ', '');

    const decodedToken = decodedJWT(jwtToken);

    await connectMongoDB();

    const user = await User.findOne({ _id: decodedToken.id });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ id: user.get('_id'), email: user.get('email') }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
