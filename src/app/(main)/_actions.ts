'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  // @ts-ignore
  cookies().set({
    name: 'userId',
    value: '',
    httpOnly: true,
    secure: true,
    path: '/'
  });
  redirect('/login');
}
