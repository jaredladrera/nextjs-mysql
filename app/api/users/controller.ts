import { NextResponse } from 'next/server';
import * as userModel from './model';

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