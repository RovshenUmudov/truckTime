import { connectMongoDB } from '@/mongoDB/mongodb';
import User from '@/mongoDB/models/user';
import { createJWT, decodedJWT } from '@/utils';

export async function POST(req: Request) {
  try {
    const token = req.headers.get('Authorization');

    if (!token) {
      return new Response(JSON.stringify({ message: 'Token not found' }), { status: 404 });
    }
    const jwtToken = token.replace('Bearer ', '');
    const decodedToken = decodedJWT(jwtToken);

    await connectMongoDB();

    const user = await User.findOne({ _id: decodedToken.id });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const tokens = createJWT(user.id);

    return new Response(JSON.stringify(tokens), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
