import { decodedJWT } from '@/utils';
import Cargo from '@/mongoDB/models/cargo';
import { ICargoValues } from '@/types';
import { connectMongoDB } from '@/mongoDB/mongodb';
import User from '@/mongoDB/models/user';

export async function POST(req: Request) {
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

    const body: ICargoValues = await req.json();

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
