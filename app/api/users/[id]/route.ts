import { getUserById } from '../controller';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  return getUserById(Number(id));
}
