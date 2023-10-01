import { EnumUserRole, ICargo } from '@/types';
import Cargo from '@/mongoDB/models/cargo';
import { authenticateUser } from '@/app/api/users/me/route';

export async function GET(req: Request) {
  try {
    const user = await authenticateUser(req);
    const { searchParams } = new URL(req.url);

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 401 });
    }

    const total = await Cargo.countDocuments();

    const sort = searchParams.get('sort') === 'DESC' ? 1 : -1;

    const cargos: ICargo[] = await Cargo.find({
      ...(user.get('role') !== EnumUserRole.admin && { userId: user.get('_id') }),
      title: { $regex: new RegExp(searchParams.get('search') || '', 'i') },
    })
      .limit(+(searchParams.get('limit') || total))
      .sort({ created: sort });

    return new Response(JSON.stringify({ data: cargos, total }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
