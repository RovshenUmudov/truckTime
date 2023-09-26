import { ICargo } from '@/types';
import Cargo from '@/mongoDB/models/cargo';
import { authenticateUser } from '@/app/api/users/me/route';

export async function GET(req: Request) {
  try {
    const user = await authenticateUser(req);
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit');

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 401 });
    }

    const cargos: ICargo[] = await Cargo.find({ userId: user.get('_id') }).limit(parseInt(limit || '-1', 10));
    const total = await Cargo.countDocuments();

    return new Response(JSON.stringify({ data: cargos, total }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
