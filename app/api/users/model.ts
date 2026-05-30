import pool from '@/lib/db';
import { Employee } from './types';

export async function getUsers() {

  const [rows] = await pool.query<Employee[]>(
    `
      SELECT *
      FROM user_list
    `
  );

  return rows;
}

export async function getUserById(id: number) {

    console.log('Fetching user with ID:', id);

  const [rows] = await pool.query<Employee[]>(
    `SELECT
        *
      FROM user_list
      WHERE index_key = ?
    `,
    [id]
  );

  return rows[0] || null;
}