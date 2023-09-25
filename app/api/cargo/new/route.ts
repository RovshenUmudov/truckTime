import Cargo from '@/mongoDB/models/cargo';
import { ICargo } from '@/types';
import { authenticateUser } from '@/app/api/users/me/route';

export async function POST(req: Request) {
  try {
    const user = await authenticateUser(req);

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 401 });
    }

    const body: ICargo = await req.json();

    const newCargo = await Cargo.create({
      userId: user.get('_id'),
      title: body.title,
      startDate: body.startDate,
      startTime: body.startTime,
      unloadDate: body.unloadDate,
      unloadTime: body.unloadTime,
      averageSpeed: body.averageSpeed,
      distance: body.distance,
      eightHoursBreak: body.eightHoursBreak,
      oneHoursBreak: body.oneHoursBreak,
      remainingWorkHours: body.remainingWorkHours,
    });

    return new Response(JSON.stringify(newCargo), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
