import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import * as userModel from './model';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export async function loginUser(body: {
  email: string;
  password: string; // employee id
}) {
  try {
    const user = await userModel.findByEmail(body.email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }   

    // 🔐 password = employee_id (as you said)
    const isValidPassword =
      user.employee_id === body.password;

    //   console.log('password:', body.password);
    //   console.log('password:', body.password);
    //   console.log('isValidPassword:', isValidPassword);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials 2' },
        { status: 401 }
      );
    }

    // 🔑 create JWT token
    const token = jwt.sign(
      {
        id: user.index_key,
        email: user.email_add,
        employee_id: user.employee_id,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.index_key,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email_add,
      },
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);

    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}