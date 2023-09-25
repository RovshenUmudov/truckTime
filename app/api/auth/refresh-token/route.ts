import { createJWT } from '@/utils';
import { authenticateUser } from '@/app/api/users/me/route';

export async function POST(req: Request) {
  try {
    const user = await authenticateUser(req);

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const tokens = createJWT(user.id);

    return new Response(JSON.stringify(tokens), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
