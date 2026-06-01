import { getUserById, updateUser } from '../controller';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  return getUserById(Number(id));
}

// PUT /api/users/:id
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();
  // console.log('Updating user with ID:', (await params).id);
  return updateUser(
    Number((await params).id),
    body
  );
}
