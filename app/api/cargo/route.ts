import { decodedJWT } from '@/utils';
import { connectMongoDB } from '@/mongoDB/mongodb';
import User from '@/mongoDB/models/user';
import { ICargo } from '@/types';
import Cargo from '@/mongoDB/models/cargo';

export async function GET(req: Request) {
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
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 401 });
    }

    const cargos: ICargo[] = await Cargo.find({ userId: user.get('_id') });

    return new Response(JSON.stringify(cargos), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
