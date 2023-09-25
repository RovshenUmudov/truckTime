import { decodedJWT } from '@/utils';
import User from '@/mongoDB/models/user';
import { ICargo } from '@/types';
import Cargo from '@/mongoDB/models/cargo';
import { authenticateUser } from '@/app/api/users/me/route';

export async function GET(req: Request) {
  try {
    const user = await authenticateUser(req);

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 401 });
    }

    const { url } = req;
    const cargoId = new URL(url).pathname.split('/').filter(Boolean).pop();

    const cargo: ICargo | null = await Cargo.findOne({ _id: cargoId || '' });

    if (!cargo) {
      return new Response(JSON.stringify({ message: `Cargo with id: ${cargoId} not found` }), { status: 404 });
    }

    return new Response(JSON.stringify(cargo), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await authenticateUser(req);

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 401 });
    }

    const { url } = req;
    const body = await req.json();

    const cargoId = new URL(url).pathname.split('/').filter(Boolean).pop();

    const cargo = await Cargo.updateOne({ _id: cargoId || '' }, body);

    if (!cargo) {
      return new Response(JSON.stringify({ message: `Cargo with id: ${cargoId} not found` }), { status: 404 });
    }

    return new Response(JSON.stringify(cargo), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await authenticateUser(req);

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 401 });
    }

    const { url } = req;
    const cargoId = new URL(url).pathname.split('/').filter(Boolean).pop();

    await Cargo.deleteOne({ _id: cargoId || '' });

    return new Response(JSON.stringify({ message: `Cargo with id ${cargoId} was deleted` }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: `Server error: ${e}` }), { status: 500 });
  }
}
