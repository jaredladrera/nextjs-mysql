import { getUsers } from './model';
import { generateExcel } from '@/app/api/_lib/services/excel.services';

export async function getAllUsers() {

  const users = await getUsers();

  // sanitize values
  const safeUsers = users.map((user) =>
    Object.fromEntries(
      Object.entries(user).map(([key, value]) => [
        key,
        typeof value === 'bigint'
          ? Number(value)
          : value ?? '',
      ])
    )
  );

  return generateExcel(safeUsers, 'User List');
}