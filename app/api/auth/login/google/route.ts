import { connectMongoDB } from '@/mongoDB/mongodb';
import User from '@/mongoDB/models/user';
import { createJWT } from '@/utils';
import jwt from 'jsonwebtoken';

interface IDecodedGoogleToken {
  iss: string;
  sub: string;
  azp: string;
  aud: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.token) {
      return new Response(JSON.stringify({ message: 'Server error: Token not found' }), { status: 404 });
    }

    const decodedToken = jwt.decode(body.token) as IDecodedGoogleToken || null;

    if (!decodedToken || !decodedToken.email) {
      return new Response(JSON.stringify({ message: 'Server error: Email not found' }), { status: 404 });
    }

    await connectMongoDB();

    let user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      user = await User.create({ email: decodedToken.email, averageSpeed: 77, role: 'user' });
    }

    const tokens = createJWT(user.id);

    return new Response(JSON.stringify(tokens), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
