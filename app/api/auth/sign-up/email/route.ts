import { connectMongoDB } from '@/mongoDB/mongodb';
import User from '@/mongoDB/models/user';
import bcrypt from 'bcryptjs';
import { createJWT } from '@/utils';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectMongoDB();

    const candidate = await User.findOne({ email }).select('_id');

    if (candidate) {
      return new Response(JSON.stringify({ message: `User with email ${email} already exist` }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });
    const tokens = createJWT(user.id);

    return new Response(JSON.stringify(tokens), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
