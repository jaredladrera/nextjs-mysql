import { NextResponse } from 'next/server';
import * as userModel from './model';
import { Employee } from './types';

export async function getUsers() {

  try {

    const users = await userModel.getUsers();

    return NextResponse.json(users);

  } catch (error) {

    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );

  }
}

export async function getUserById(id: number) {

  try {

    const user = await userModel.getUserById(id);

    if (!user) {

      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );

    }

    return NextResponse.json(user);

  } catch (error) {

    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );

  }
}

export async function createUser(data: Partial<Employee>) {
  try {
    if (!data.employee_id) {
      return NextResponse.json(
        { error: 'employee_id is required' },
        { status: 400 }
      );
    }

    const insertId = await userModel.createUser(data);

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        id: insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE USER ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

/**
 * UPDATE USER
 */
export async function updateUser(
  id: number,
  data: Partial<Employee>
) {
  try {

    // console.log('Updating user with id:', id);
    if (!id) {
      return NextResponse.json(
        { error: 'Invalid user id' },
        { status: 400 }
      );
    }

    // prevent accidental primary key overwrite
    delete (data as any).index_key;

    const affectedRows = await userModel.updateUser(id, data);

    if (affectedRows === 0) {
      return NextResponse.json(
        { error: 'User not found or no changes made' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error('UPDATE USER ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}