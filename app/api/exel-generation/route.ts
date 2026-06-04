import { NextResponse } from 'next/server';
import { getAllUsers } from './controller';

export async function GET() {

  try {

    const buffer = await getAllUsers();

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition':
          'attachment; filename="user_list.xlsx"',
      },
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: 'Failed to generate excel' },
      { status: 500 }
    );

  }

}