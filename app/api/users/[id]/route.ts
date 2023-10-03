import { authenticateUser } from '@/app/api/users/me/route';
import User from '@/mongoDB/models/user';
import { IUser } from '@/types';

export async function GET(req: Request) {
  try {
    const user = await authenticateUser(req);

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const { url } = req;
    const userId = new URL(url).pathname.split('/').filter(Boolean).pop();

    const result: IUser | null = await User.findOne({ _id: userId });

    if (!result) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({
      _id: result._id,
      email: result.email,
      averageSpeed: result.averageSpeed,
      role: result.role,
      restTime: result.restTime,
    }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
