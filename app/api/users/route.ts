import { getUsers, createUser } from './controller';

export async function GET() {
  return getUsers();
}

// POST /api/users
export async function POST(req: Request) {
  const body = await req.json();

  return createUser(body);
}