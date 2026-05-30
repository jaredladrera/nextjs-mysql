import { getUsers } from './controller';

export async function GET() {
  return getUsers();
}