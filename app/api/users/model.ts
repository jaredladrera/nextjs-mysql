import pool from '@/lib/db';
import { Employee } from './types';
import { ResultSetHeader } from 'mysql2';

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
  const [rows] = await pool.query<Employee[]>(
    `
      SELECT *
      FROM user_list
      WHERE index_key = ?
    `,
    [id]
  );

  return rows[0] || null;
}

export async function createUser(data: Partial<Employee>) {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO user_list SET ?',
    [data]
  );

  return result.insertId;
}

export async function updateUser(
  id: number,
  data: Partial<Employee>
) {
  delete data.index_key;

  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE user_list SET ? WHERE index_key = ?',
    [data, id]
  );

  return result.affectedRows;
}