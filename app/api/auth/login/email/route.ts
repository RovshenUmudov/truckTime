import { connectMongoDB } from '@/mongoDB/mongodb';
import User from '@/mongoDB/models/user';
import { createJWT } from '@/utils';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectMongoDB();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const isPasValid = bcrypt.compareSync(password, user.password || '');

    if (!isPasValid) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 400 });
    }

    const tokens = createJWT(user.id);

    return new Response(JSON.stringify(tokens), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
