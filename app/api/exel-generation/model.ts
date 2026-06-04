import pool from '@/app/_lib/db';
import { Employee } from '../users/types';

export async function getUsers() {
  const [rows] = await pool.query<Employee[]>(
    `
      SELECT *
      FROM user_list
    `
  );

  return rows;
}