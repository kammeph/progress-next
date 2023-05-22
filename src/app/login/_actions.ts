'use server';

import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function login(username: string, password: string) {
  if (!username || !password) throw new Error('Invalid username or password');
  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  });

  if (!user) throw new Error('User not found');
  if (!password || !bcrypt.compareSync(password, user.password)) throw new Error('Invalid password');
  if (!user.canLogin) throw new Error('User has no permission to login');

  // @ts-ignore
  cookies().set({
    name: 'userId',
    value: user.id,
    httpOnly: true,
    secure: true,
    path: '/'
  });
  revalidatePath('/profile');
  redirect('/profile');
}
