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

    let total = 0;

    if (user.get('role') === EnumUserRole.admin) {
      total = await Cargo.countDocuments();
    } else {
      total = await Cargo.find({ userId: user.get('_id') }).countDocuments();
    }

    const sort = searchParams.get('sort') === 'DESC' ? 1 : -1;

    const cargos: ICargo[] = await Cargo.find({
      ...(user.get('role') !== EnumUserRole.admin && { userId: user.get('_id') }),
      title: { $regex: new RegExp(searchParams.get('search') || '', 'i') },
      ...(searchParams.get('type') && { type: searchParams.get('type') }),
    })
      .limit(+(searchParams.get('limit') || total))
      .sort({ created: sort });

    return new Response(JSON.stringify({ data: cargos, total }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
