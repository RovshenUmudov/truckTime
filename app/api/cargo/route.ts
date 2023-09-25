import { ICargo } from '@/types';
import Cargo from '@/mongoDB/models/cargo';
import { authenticateUser } from '@/app/api/users/me/route';

export async function GET(req: Request) {
  try {
    const user = await authenticateUser(req);

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 401 });
    }

    const cargos: ICargo[] = await Cargo.find({ userId: user.get('_id') });

    return new Response(JSON.stringify(cargos), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
