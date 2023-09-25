import { connectMongoDB } from '@/mongoDB/mongodb';
import User from '@/mongoDB/models/user';
import { decodedJWT } from '@/utils';

export async function authenticateUser(req: Request) {
  const token = req.headers.get('Authorization');

  if (!token) {
    return null;
  }

  const jwtToken = token.replace('Bearer ', '');
  const decodedToken = decodedJWT(jwtToken);

  await connectMongoDB();
  const user = await User.findOne({ _id: decodedToken.id });

  return user;
}

export async function GET(req: Request) {
  try {
    const user = await authenticateUser(req);

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ id: user.get('_id'), email: user.get('email') }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
