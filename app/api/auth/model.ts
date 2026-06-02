import pool from '@/app/_lib/db';
import { Employee } from '../users/types';

export async function findByEmail(email: string) {
  const [rows] = await pool.query<Employee[]>(
    `
      SELECT *
      FROM user_list
      WHERE email_add = ?
      LIMIT 1
    `,
    [email]
  );

  return rows[0] || null;
}