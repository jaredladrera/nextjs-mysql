import { loginUser } from '@/app/api/auth/controller';

export async function POST(req: Request) {
  const body = await req.json();
  return loginUser(body);
}